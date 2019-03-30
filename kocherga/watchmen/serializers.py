from rest_framework import serializers

from . import models
import kocherga.staff.models


class WatchmanSerializer(serializers.ModelSerializer):
    class Meta:
        model = kocherga.staff.models.Member
        fields = ('short_name', 'color')


class ShiftSerializer(serializers.ModelSerializer):
    watchman = WatchmanSerializer()

    class Meta:
        model = models.Shift
        fields = ('date', 'shift', 'watchman', 'is_night')
