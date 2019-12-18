import logging
logger = logging.getLogger(__name__)

from rest_framework import serializers
from django.contrib.auth import get_user_model

from . import models

from kocherga.auth.serializers import UserSerializer


class PaymentSerializer(serializers.ModelSerializer):
    whom = UserSerializer(read_only=True)
    whom_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = models.Payment
        fields = ('id', 'amount', 'whom', 'comment', 'is_redeemed', 'created_dt', 'redeem_dt', 'whom_id')
        read_only_fields = ('id', 'whom', 'is_redeemed', 'created_dt', 'redeem_dt')

    def create(self, validated_data):
        user_id = validated_data.pop('whom_id')
        user = get_user_model().objects.get(pk=user_id)

        payment = models.Payment.objects.create(
            whom=user,
            amount=validated_data.pop('amount'),
            comment=validated_data.pop('comment'),
        )
        return payment
