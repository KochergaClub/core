import base64
import logging

from typing import Union

import binascii
from django.core.signing import TimestampSigner, BadSignature
from django.db import models
from django.db.models import QuerySet
from jwt.utils import base64url_encode, base64url_decode

from kocherga.auth.models import User as KchUser

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
    uid = models.CharField(max_length=100, null=False)
    desc = models.CharField(max_length=300)
    photo = models.BinaryField()
    state = models.BinaryField(null=True)

    def generate_token(self) -> str:
        return base64url_encode(bytes(signer.sign(self.user.email), "utf-8"))


def get_user(token) -> Union[User, None]:
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
