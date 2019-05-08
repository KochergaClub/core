from rest_framework import serializers

from . import models


class TrainingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Training
        fields = ('name', 'date', 'salaries_paid', 'long_name')


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Ticket
        fields = ('email', 'first_name', 'last_name')


class ActivitySerializer(serializers.ModelSerializer):
    trainer = serializers.SlugRelatedField(slug_field='long_name', read_only=True)

    class Meta:
        model = models.Activity
        fields = ('day', 'time', 'activity_type', 'name', 'trainer', 'location')
