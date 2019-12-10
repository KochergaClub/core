from rest_framework import serializers

from . import models


class TrainingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Training
        fields = ('id', 'name', 'slug', 'date', 'salaries_paid', 'long_name', 'tickets_count', 'total_income')
        read_only_fields = ('id', 'salaries_paid', 'long_name', 'tickets_count', 'total_income')


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Ticket
        fields = (
            'id',
            'training',
            'email', 'first_name', 'last_name',
            'status', 'payment_amount', 'fiscalization_status', 'ticket_type', 'payment_type',
        )


class ActivitySerializer(serializers.ModelSerializer):
    trainer = serializers.SlugRelatedField(slug_field='long_name', read_only=True)

    class Meta:
        model = models.Activity
        fields = ('id', 'time', 'activity_type', 'name', 'trainer', 'location')


class TrainingDaySerializer(serializers.ModelSerializer):
    schedule = ActivitySerializer(many=True)

    class Meta:
        model = models.TrainingDay
        fields = ('id', 'date', 'schedule')


class TrainerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Trainer
        fields = ('id', 'short_name', 'long_name')
