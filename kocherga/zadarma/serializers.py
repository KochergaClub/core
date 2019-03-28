from rest_framework import serializers

from . import models


class CallSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Call
        fields = (
            'ts', 'call_id', 'pbx_call_id',
            'call_type', 'disposition', 'is_recorded', 'record', 'watchman', 'sip', 'destination', 'clid'
        )
