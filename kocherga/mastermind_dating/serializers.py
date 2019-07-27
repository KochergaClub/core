from rest_framework import serializers

from . import models


class CohortSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Cohort
        fields = ('id', 'sent_emails', 'event_id', 'event_title', 'event_start')

    event_id = serializers.CharField(source='event.pk', required=False, read_only=True)
    event_title = serializers.CharField(source='event.title', required=False, read_only=True)
    event_start = serializers.DateTimeField(source='event.start', required=False, read_only=True)


class UserSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = models.User
        fields = ('user_id', 'user', 'name', 'desc', 'photo', 'telegram_link', 'voted_for', 'present')
