from rest_framework import serializers

from . import models

class CohortSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Cohort
        fields = ('id',)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('user', 'name',)
