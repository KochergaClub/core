import graphene
from graphene_django.types import DjangoObjectType

from . import models


class SlackUser(DjangoObjectType):
    class Meta:
        model = models.User
        fields = ('slack_id', 'image_url')
