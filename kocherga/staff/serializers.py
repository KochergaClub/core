from rest_framework import serializers

from . import models


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Member
        fields = ('id', 'short_name', 'full_name', 'color', 'slack_id', 'vk')
