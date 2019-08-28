from rest_framework import serializers

from django.contrib.auth import get_user_model

from . import models


class PaymentSerializer(serializers.ModelSerializer):
    whom = serializers.SlugRelatedField(
        slug_field='email', queryset=get_user_model().objects.all(),
    )

    class Meta:
        model = models.Payment
        fields = ('id', 'amount', 'whom', 'comment', 'is_redeemed', 'created_dt', 'redeem_dt')
