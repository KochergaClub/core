from rest_framework import serializers
from .. import models


class TimepadAnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TimepadAnnouncement
        fields = ('link',)


class VkAnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.VkAnnouncement
        fields = ('link',)


class FbAnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FbAnnouncement
        fields = ('link',)
