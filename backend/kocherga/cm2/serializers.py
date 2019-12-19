from rest_framework import serializers

from . import models


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Customer
        fields = ('id', 'card_id', 'first_name', 'last_name')
        read_only_fields = ('id',)


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Order
        fields = ('id', 'start', 'end', 'value', 'customer')
        read_only_fields = ('id', 'start', 'end', 'value')
