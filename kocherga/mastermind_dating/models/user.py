import logging
logger = logging.getLogger(__name__)

from django.db import models

from kocherga.django import settings
from django.contrib.auth import get_user_model
from django.core.signing import TimestampSigner, BadSignature

from django.core.mail import send_mail
from django.template.loader import render_to_string

import markdown
import binascii
import json
import typing
from jwt.utils import base64url_encode, base64url_decode

from .. import rpc

KchUser = get_user_model()

signer = TimestampSigner()

class State(dict):

    def __init__(self):
        super().__init__()

    def __getattr__(self, item):
        prefix = self.__class__.__name__
        key = prefix + "." + item
        if key in self:
            return self[key]
        else:
            raise AttributeError

    def __setattr__(self, key, value):
        self[self.__class__.__name__ + "." + key] = value


class UserManager(models.Manager):
    def get_by_token(self, token) -> typing.Union['User', None]:
        if token is None or len(token) == 0:
            return None
        try:
            token = base64url_decode(token)
            # STOPSHIP: change back to 600
            user_id = signer.unsign(str(token, "utf-8"), max_age=86400 * 7)
        except BadSignature:
            return None
        except binascii.Error:
            return None

        user, _ = User.objects.get_or_create(pk=user_id)
        return user


def photo_path(instance, filename):
    return f'mastermind_dating/photos/{instance.user.id}/{filename}'

class User(models.Model):
    user = models.OneToOneField(KchUser, on_delete=models.CASCADE, primary_key=True)
    telegram_uid = models.CharField(max_length=100, blank=True)
    name = models.CharField(max_length=255, blank=True)
    desc = models.TextField(blank=True)
    photo = models.ImageField(null=True, blank=True, upload_to=photo_path)
    state = models.TextField(blank=True)
    chat_id = models.IntegerField(null=True, blank=True)
    voted_for = models.BooleanField(default=False)
    present = models.BooleanField(default=False)

    # TODO - one user can belong to mutliple cohorts
    cohort = models.ForeignKey('Cohort', on_delete=models.CASCADE, related_name='users')

    group = models.ForeignKey('Group', on_delete=models.PROTECT, related_name='users', blank=True, null=True)

    objects = UserManager()

    def generate_token(self) -> str:
        return base64url_encode(bytes(signer.sign(self.user_id), "utf-8"))

    def is_bound(self):
        return bool(self.telegram_uid)

    _S = typing.TypeVar("_S")

    def edit_state(self, type: typing.Type[_S]) -> typing.ContextManager[_S]:
        user = self

        class EditState:

            def __enter__(self):
                self.state = user.get_state(type)
                return self.state

            def __exit__(self, exc_type, exc_val, exc_tb):
                user.set_state(self.state)
                user.save()

        return EditState()

    def get_state(self, clazz: typing.Type[_S] = State) -> _S:
        """
        :rtype: State
        """
        base = clazz()
        if self.state:
            base.update(json.loads(self.state))
        return base

    def set_state(self, state):
        """

        :type state: State
        """
        self.state = json.dumps(state)

    def generate_link(self):
        return f"{settings.MASTERMIND_BOT_CONFIG['bot_link']}&start={str(self.generate_token(), 'utf-8')}"

    def telegram_link(self):
        return self.generate_link()

    def send_invite_email(self):
        bot_link = self.telegram_link()
        bot_token = str(self.generate_token(), 'utf-8')

        message = render_to_string('mastermind_dating/email/bot_link.txt', {
            'bot_link': bot_link,
            'bot_token': bot_token,
        })

        html = markdown.markdown(render_to_string('mastermind_dating/email/bot_link.md', {
            'bot_link': bot_link,
            'bot_token': bot_token,
        }))
        send_mail(
            subject='Регистрация на мастермайнд-дейтинг',
            from_email='Кочерга <info@kocherga-club.ru>',
            message=message,
            html_message=html,
            recipient_list=[self.user.email],
        )
        logger.info(f'sent email to {self.user.email}')

    def tinder_activate(self):
        manager = rpc.get_client()
        manager.tinder_activate(self.user_id)
