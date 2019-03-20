from rest_framework import serializers

from . import models


class TrainingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Training
        fields = ('name', 'url', 'date', 'salaries_paid')
    url = serializers.URLField(source='get_absolute_url')


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Ticket
        fields = ('email', 'first_name', 'last_name')


class ActivitySerializer(serializers.ModelSerializer):
    trainer = serializers.SlugRelatedField(slug_field='short_name', read_only=True)

    class Meta:
        model = models.Activity
        fields = ('day', 'time', 'activity_type', 'name', 'trainer')
