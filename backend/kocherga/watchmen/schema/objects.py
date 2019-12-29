from graphene_django import DjangoObjectType
from .. import models


class WatchmenGrade(DjangoObjectType):
    class Meta:
        fields = ('id', 'code', 'multiplier')
        model = models.Grade


class WatchmenWatchman(DjangoObjectType):
    class Meta:
        fields = ('id', 'priority', 'member', 'grade')
        model = models.Watchman


class WatchmenShift(DjangoObjectType):
    class Meta:
        fields = ('date', 'shift', 'watchman', 'is_night')
        model = models.Shift
