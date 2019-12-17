from rest_framework import serializers

from . import models


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = ('id', 'start', 'end')
        read_only_fields = ('id', 'start', 'end')
