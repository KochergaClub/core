from rest_framework import serializers

from .models import Customer, Order


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('card_id', 'subscription_until', 'last_visit', 'total_spent', 'privacy_mode')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('order_id',)
