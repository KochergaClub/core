import logging

logger = logging.getLogger(__name__)

from django.db import models
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.signing import TimestampSigner, BadSignature
from django.utils import timezone

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


class ParticipantManager(models.Manager):
    def get_by_token(self, token) -> typing.Union['Participant', None]:
        if token is None or len(token) == 0:
            return None
        try:
            token = base64url_decode(token)
            participant_id = signer.unsign(str(token, "utf-8"), max_age=86400 * 7)
        except BadSignature:
            return None
        except binascii.Error:
            return None

        participant, _ = Participant.objects.get_or_create(pk=participant_id)
        return participant


def photo_path(instance, filename):
    return f'mastermind_dating/photos/{instance.user.id}/{filename}'


_S = typing.TypeVar("_S")


class Participant(models.Model):
    """
    Note that Participant is not a user! It's a user PLUS cohort.
    """

    user = models.ForeignKey(
        KchUser, on_delete=models.CASCADE, related_name='mastermind_dating_participants'
    )
    name = models.CharField(max_length=255, blank=True)
    desc = models.TextField(blank=True)
    photo = models.ImageField(null=True, blank=True, upload_to=photo_path)
    state = models.TextField(blank=True)
    voted_for = models.BooleanField(default=False)
    present = models.BooleanField(default=False)
    invite_email_sent = models.BooleanField(default=False)

    # deprecated - moved to TelegramUser
    telegram_uid = models.CharField(max_length=100, blank=True)
    chat_id = models.IntegerField(null=True, blank=True)

    cohort = models.ForeignKey(
        'Cohort', on_delete=models.CASCADE, related_name='participants'
    )

    group = models.ForeignKey(
        'Group',
        on_delete=models.PROTECT,
        related_name='participants',
        blank=True,
        null=True,
    )

    objects = ParticipantManager()

    class Meta:
        unique_together = (('user', 'cohort'),)

    def get_telegram_uid(self):
        return self.user.mastermind_dating_telegram_user.telegram_uid

    def get_chat_id(self):
        return self.user.mastermind_dating_telegram_user.chat_id

    def generate_token(self) -> bytes:
        return base64url_encode(bytes(signer.sign(self.id), "utf-8"))

    def is_bound(self):
        return bool(self.telegram_uid)

    def edit_state(self, type: typing.Type[_S]) -> typing.ContextManager[_S]:
        participant = self

        class EditState:
            def __enter__(self):
                self.state = participant.get_state(type)
                return self.state

            def __exit__(self, exc_type, exc_val, exc_tb):
                participant.set_state(self.state)
                participant.save()

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
        if self.invite_email_sent:
            raise Exception("Already sent invite email")

        bot_link = self.telegram_link()
        bot_token = str(self.generate_token(), 'utf-8')
        start_time = (
            timezone.localtime(self.cohort.event.start).strftime('%H:%M')
            if self.cohort.event
            else None
        )

        message = render_to_string(
            'mastermind_dating/email/bot_link.txt',
            {'bot_link': bot_link, 'bot_token': bot_token, 'start_time': start_time,},
        )

        html = markdown.markdown(
            render_to_string(
                'mastermind_dating/email/bot_link.md',
                {
                    'bot_link': bot_link,
                    'bot_token': bot_token,
                    'start_time': start_time,
                },
            )
        )
        send_mail(
            subject='Регистрация на мастермайнд-дейтинг',
            from_email='Кочерга <info@kocherga-club.ru>',
            message=message,
            html_message=html,
            recipient_list=[self.user.email],
        )
        logger.info(f'sent email to {self.user.email}')
        self.invite_email_sent = True
        self.save()

    def tinder_activate(self):
        manager: typing.Any = rpc.get_client()
        manager.tinder_activate(self.id)

    def timetable(self):
        # copypaste from interactions!
        class TimeState(State):
            def __init__(self):
                super().__init__()
                self.selected_time = []
                self.confirmed = False

        with self.edit_state(TimeState) as s:
            return TimeTable(s.selected_time)


class TimeTable:
    def __init__(self, selected_time: typing.List[str]):
        self.selected_time = selected_time

    def lliira_line(self):
        result = []
        for day in range(7):
            for slot in range(3):
                cell = f"{day}.{slot}"
                if cell in self.selected_time:
                    result.append('4')
                else:
                    result.append('0')
        return '\t'.join(result)
