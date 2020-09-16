from django.db import models
from kocherga.django.models import SingletonModel


class Auth(SingletonModel):
    token = models.CharField(max_length=1024)
