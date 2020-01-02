from rest_framework import serializers

from . import models


class TrainingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Training
        fields = ('id', 'name', 'slug', 'date', 'salaries_paid', 'long_name', 'tickets_count', 'total_income')
        read_only_fields = ('id', 'salaries_paid', 'long_name', 'tickets_count', 'total_income')
