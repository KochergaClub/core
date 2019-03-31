from rest_framework import serializers

from . import models
import kocherga.staff.models


class WatchmanSerializer(serializers.ModelSerializer):
    class Meta:
        model = kocherga.staff.models.Member
        fields = ('id', 'short_name', 'color')


class ShiftSerializer(serializers.ModelSerializer):
    watchman = WatchmanSerializer()

    class Meta:
        model = models.Shift
        fields = ('date', 'shift', 'watchman', 'is_night')


class UpdateShiftSerializer(serializers.ModelSerializer):
    watchman = serializers.CharField(max_length=100)

    class Meta:
        model = models.Shift
        fields = ('date', 'shift', 'watchman', 'is_night')

    def update(self, instance, validated_data):
        watchman_name = validated_data['watchman']

        try:
            instance.watchman = kocherga.staff.models.Member.objects.get(short_name=watchman_name)
        except kocherga.staff.models.Member.DoesNotExist:
            raise serializers.ValidationError(f'Watchman {watchman_name} not found')

        if 'is_night' in validated_data:
            instance.is_night = validated_data['is_night']

        # Surprisingly, DRF serializers don't call full_clean() by themselves.
        # Relevant discussion: https://github.com/encode/django-rest-framework/issues/3144
        instance.full_clean()

        instance.save()

        return instance
