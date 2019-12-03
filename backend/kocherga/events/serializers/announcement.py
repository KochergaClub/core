from rest_framework import serializers
from .. import models


class TimepadAnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.TimepadAnnouncement
        fields = ('link', 'category_code', 'prepaid_tickets')


class VkAnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.VkAnnouncement
        fields = ('link', 'group', 'image')


class FbAnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FbAnnouncement
        fields = ('link', 'group', 'added_to_main_page', 'shared_to_main_page')
