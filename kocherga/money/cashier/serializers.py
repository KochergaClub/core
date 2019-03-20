from rest_framework import serializers

from . import models


class ChequeSerializer(serializers.ModelSerializer):
    whom = serializers.SlugRelatedField(slug_field='email', read_only=True)

    class Meta:
        model = models.Cheque
        fields = ('id', 'amount', 'whom', 'comment', 'is_redeemed')
