from rest_framework import serializers

from . import models
from kocherga.staff.serializers import ShortMemberSerializer


class CallSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Call
        fields = (
            'ts', 'call_id', 'pbx_call_id',
            'call_type', 'disposition', 'is_recorded', 'record', 'watchman', 'sip', 'destination', 'clid'
        )


class PbxDataSerializer(serializers.ModelSerializer):
    staff_member = ShortMemberSerializer()

    class Meta:
        model = models.PbxCallData
        fields = ('staff_member',)


class PbxCallSerializer(serializers.ModelSerializer):
    calls = CallSerializer(many=True, read_only=True)
    data = PbxDataSerializer()

    class Meta:
        model = models.PbxCall
        fields = ('pbx_call_id', 'ts', 'calls', 'data')
