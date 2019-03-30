from rest_framework import serializers

from . import models


class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Shift
        fields = ('date', 'shift', 'watchman_name', 'color')
