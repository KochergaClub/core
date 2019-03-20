from rest_framework import serializers

from . import models


class ScheduleItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ScheduleItem
        fields = ('date', 'shift', 'watchman')
