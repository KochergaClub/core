import logging
logger = logging.getLogger(__name__)

from rest_framework import serializers
from . import models


class MemberInterestSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=20)
    name = serializers.CharField(max_length=100)
    subscribed = serializers.BooleanField()


class MailchimpMemberSerializer(serializers.Serializer):
    status = serializers.CharField(max_length=100)
    interests = MemberInterestSerializer(many=True)

    def create(self, validated_data):
        raise Exception("Not implemented")

    def update(self, instance, validated_data):
        raise Exception("Not implemented")


class MailchimpInterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MailchimpInterest
        fields = (
            'id', 'interest_id', 'name', 'subscriber_count'
        )


class MailchimpCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.MailchimpCategory
        fields = (
            'id', 'category_id', 'title', 'interest_ids'
        )

    interest_ids = serializers.PrimaryKeyRelatedField(source='interests', many=True, read_only=True)


class SubscribeChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SubscribeChannel
        fields = ('id', 'slug', 'interest_ids')

    interest_ids = serializers.PrimaryKeyRelatedField(
        source='interests',
        many=True,
        queryset=models.MailchimpInterest.objects.all(),
    )
