from rest_framework import serializers

from . import models


class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Record
        fields = (
            'id',
            'ts',
            'purpose',
            'document_type',
            'total',
            'counterparty_name',
            'counterparty_inn',
            'counterparty_bank_bic',
            'counterparty_bank_account_number',
            'counterparty_bank_name',
        )
