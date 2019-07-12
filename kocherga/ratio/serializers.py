from rest_framework import serializers

from . import models


class TrainingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Training
        fields = ('id', 'name', 'date', 'slug', 'salaries_paid', 'long_name')


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Ticket
        fields = ('id', 'email', 'first_name', 'last_name', 'status', 'payment_amount', 'fiscalization_status')


class ActivitySerializer(serializers.ModelSerializer):
    trainer = serializers.SlugRelatedField(slug_field='long_name', read_only=True)

    class Meta:
        model = models.Activity
        fields = ('id', 'day', 'time', 'activity_type', 'name', 'trainer', 'location')


class TrainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Trainer
        fields = ('id', 'short_name', 'long_name')
