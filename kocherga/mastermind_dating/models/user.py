from django.db import models
from django.contrib.auth import get_user_model
from django.core.signing import TimestampSigner, BadSignature

import binascii
import json
import typing
from jwt.utils import base64url_encode, base64url_decode

from kocherga.django import settings

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
            email = signer.unsign(str(token, "utf-8"), max_age=6000000)
        except BadSignature:
            return None
        except binascii.Error:
            return None

        user, _ = User.objects.get_or_create(user=KchUser.objects.get(email=email))
        return user

class User(models.Model):
    user = models.OneToOneField(KchUser, on_delete=models.CASCADE, primary_key=True)
    telegram_uid = models.CharField(max_length=100, null=True, blank=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    desc = models.TextField(null=True, blank=True)
    photo = models.BinaryField(null=True, blank=True)
    state = models.TextField(null=True, blank=True)
    chat_id = models.IntegerField(null=True, blank=True)

    # TODO - one user can belong to mutliple cohorts
    cohort = models.ForeignKey('Cohort', on_delete=models.CASCADE, related_name='users')

    objects = UserManager()

    def generate_token(self) -> str:
        return base64url_encode(bytes(signer.sign(self.user.email), "utf-8"))

    def is_bound(self):
        return self.telegram_uid is not None

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
        if self.state is not None:
            base.update(json.loads(self.state))
        return base

    def set_state(self, state):
        """

        :type state: State
        """
        self.state = json.dumps(state)

    def generate_link(self):
        return f"{settings.MASTERMIND_BOT_CONFIG['bot_link']}?start={str(self.generate_token(), 'utf-8')}"
