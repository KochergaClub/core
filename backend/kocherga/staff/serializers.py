from rest_framework import serializers

from . import models


class MemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Member
        fields = (
            'id', 'email',
            'role',
            'is_current',
            'short_name', 'full_name',
            'color',
            'slack_id', 'slack_image',
            'vk',
            'user_id',
        )

    email = serializers.CharField(source='user.email')
    user_id = serializers.IntegerField(source='user.id')


class ShortMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Member
        fields = ('id', 'short_name', 'color')
