from rest_framework import serializers
from . import models


class SubscribeChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SubscribeChannel
        fields = ('id', 'slug', 'interest_ids')

    interest_ids = serializers.PrimaryKeyRelatedField(
        source='interests', many=True, queryset=models.MailchimpInterest.objects.all(),
    )
