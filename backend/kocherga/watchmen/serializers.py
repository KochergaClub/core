import logging
logger = logging.getLogger(__name__)

from rest_framework import serializers

import channels.layers
from asgiref.sync import async_to_sync

from . import models


class WatchmanSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Watchman
        fields = ('id', 'member_id', 'short_name', 'color', 'grade_id', 'is_current', 'priority')

    member_id = serializers.CharField(source='member.pk', read_only=True)
    short_name = serializers.CharField(source='member.short_name', read_only=True)
    color = serializers.CharField(source='member.color', read_only=True)
    is_current = serializers.BooleanField(source='member.is_current', read_only=True)
    grade_id = serializers.IntegerField(source='grade.id', required=False)
    priority = serializers.IntegerField()

    def update(self, instance, validated_data):
        logger.info(validated_data)
        grade_id = validated_data.pop('grade', {}).get('id', None)

        if grade_id:
            try:
                instance.grade = models.Grade.objects.get(pk=grade_id)
            except models.Watchman.DoesNotExist:
                raise serializers.ValidationError(f"Grade {grade_id} not found")

        priority = validated_data.pop('priority', None)
        if priority is not None:
            instance.priority = priority

        instance.full_clean()
        instance.save()

        return instance


class ShiftSerializer(serializers.ModelSerializer):
    watchman = WatchmanSerializer()

    class Meta:
        model = models.Shift
        fields = ('date', 'shift', 'watchman', 'is_night')


class UpdateShiftSerializer(serializers.ModelSerializer):
    watchman_id = serializers.IntegerField(required=False, allow_null=True)

    class Meta:
        model = models.Shift
        fields = ('date', 'shift', 'watchman_id', 'is_night')
        read_only_fields = ('date', 'shift')

    def update(self, instance, validated_data):
        watchman_id = validated_data.pop('watchman_id', None)

        if watchman_id:
            try:
                instance.watchman = models.Watchman.objects.get(pk=watchman_id)
            except models.Watchman.DoesNotExist:
                raise serializers.ValidationError(f"Watchman {watchman_id} not found")
        else:
            instance.watchman = None

        if 'is_night' in validated_data:
            instance.is_night = validated_data['is_night']

        # Surprisingly, DRF serializers don't call full_clean() by themselves.
        # Relevant discussion: https://github.com/encode/django-rest-framework/issues/3144
        instance.full_clean()

        instance.save()

        async_to_sync(channels.layers.get_channel_layer().group_send)(
            'watchmen_schedule_group', {
                'type': 'notify.update',
            }
        )

        return instance


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Grade
        fields = ('id', 'code', 'multiplier')