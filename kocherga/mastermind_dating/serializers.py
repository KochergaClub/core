from rest_framework import serializers

from . import models


class CohortSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Cohort
        fields = ('id', 'sent_emails', 'event_id', 'event_title')

    event_id = serializers.CharField(source='event.pk', required=False)
    event_title = serializers.CharField(source='event.title', required=False)


class UserSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = models.User
        fields = ('user_id', 'user', 'name', 'desc', 'photo', 'telegram_link', 'voted_for', 'present')
