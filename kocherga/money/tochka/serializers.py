from rest_framework import serializers

from . import models


class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Record
        fields = ('id', 'ts', 'purpose', 'document_type', 'total')
