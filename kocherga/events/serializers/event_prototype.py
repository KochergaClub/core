from rest_framework import serializers
from django.conf import settings

from kocherga.dateutils import dts

from .. import models
from .event import EventSerializer

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


class DetailedEventPrototypeSerializer(EventPrototypeSerializer):
    class Meta:
        model = models.EventPrototype
        fields = FIELDS + (
            'suggested',
            'instances',
        )
        read_only_fields = ('image', 'canceled_dates')

    suggested = serializers.SerializerMethodField()

    def get_suggested(self, obj):
        return [dts(dt) for dt in obj.suggested_dates(limit=5)]

    instances = serializers.SerializerMethodField()

    def get_instances(self, obj):
        return list(EventSerializer(obj.instances(limit=20), many=True).data)
