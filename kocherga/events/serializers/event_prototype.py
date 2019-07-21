from rest_framework import serializers
from django.conf import settings

from kocherga.dateutils import dts

from .. import models

FIELDS = (
    'prototype_id',
    'title', 'location', 'summary', 'description',
    'timepad_category_code', 'timepad_prepaid_tickets', 'timing_description_override',
    'vk_group', 'fb_group',
    'weekday', 'hour', 'minute', 'length',
    'image',
    'active',
    'canceled_dates',
    'tags',
)


class EventPrototypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EventPrototype
        fields = FIELDS
        read_only_fields = ('image', 'canceled_dates')

    tags = serializers.SerializerMethodField()

    def get_tags(self, obj):
        return obj.tag_names()

    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        if obj.image:
            return settings.KOCHERGA_API_ROOT + f"/images/{obj.image}"
        else:
            return None


# This serializer is not really necessary since we've removed its `instances` field.
class DetailedEventPrototypeSerializer(EventPrototypeSerializer):
    class Meta:
        model = models.EventPrototype
        fields = FIELDS + (
            'suggested',
        )
        read_only_fields = ('image', 'canceled_dates')

    suggested = serializers.SerializerMethodField()

    def get_suggested(self, obj):
        return [dts(dt) for dt in obj.suggested_dates(limit=5)]
