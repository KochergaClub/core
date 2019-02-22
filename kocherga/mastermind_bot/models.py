import json
import logging
import typing

import binascii
from django.core.signing import TimestampSigner, BadSignature
from django.db import models
from django.db.models import QuerySet
from jwt.utils import base64url_encode, base64url_decode

from kocherga.auth.models import User as KchUser
from kocherga.django import settings

log = logging.getLogger("mmbot_models")
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


class User(models.Model):
    objects: QuerySet
    user = models.OneToOneField(KchUser, on_delete=models.CASCADE, primary_key=True)
    uid = models.TextField(null=True)
    name = models.TextField(null=True)
    desc = models.TextField(null=True)
    photo = models.BinaryField(null=True)
    state = models.TextField(null=True)
    chat_id = models.IntegerField(null=True)

    def generate_token(self) -> str:
        return base64url_encode(bytes(signer.sign(self.user.email), "utf-8"))

    def is_bound(self):
        return self.uid is not None

    _S = typing.TypeVar("_S")

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
        return f"{settings.MASTERMIND_BOT_CONFIG['bot_link']}&start={str(self.generate_token(), 'utf-8')}"


def get_mm_user_by_token(token) -> typing.Union[User, None]:
    if token is None or len(token) == 0:
        return None
    try:
        token = base64url_decode(token)
        email = signer.unsign(str(token, "utf-8"), max_age=600)
    except BadSignature:
        return None
    except binascii.Error:
        return None

    user, _ = User.objects.get_or_create(user=KchUser.objects.get(email=email))
    return user


class Vote(models.Model):
    objects: QuerySet
    who = models.ForeignKey(User, related_name="who", on_delete=models.CASCADE)
    whom = models.ForeignKey(User, related_name="whom", on_delete=models.CASCADE)
    how = models.IntegerField()
