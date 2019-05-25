from rest_framework import serializers

from . import models


class CallSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Call
        fields = (
            'ts', 'call_id', 'pbx_call_id',
            'call_type', 'disposition', 'is_recorded', 'record', 'watchman', 'sip', 'destination', 'clid'
        )


class PbxCallSerializer(serializers.ModelSerializer):
    calls = CallSerializer(many=True, read_only=True)

    class Meta:
        model = models.PbxCall
        fields = ('pbx_call_id', 'ts', 'calls')
