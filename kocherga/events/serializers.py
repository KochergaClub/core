from rest_framework import serializers

from kocherga.dateutils import MSK_DATE_FORMAT, dts
import kocherga.room

from . import models


class PublicEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Event
        fields = ('event_id', 'title', 'room', 'announcements', 'start', 'end')

    event_id = serializers.ReadOnlyField(source='google_id')

    room = serializers.SerializerMethodField()

    def get_room(self, obj):
        return kocherga.room.pretty(obj.get_room())

    announcements = serializers.SerializerMethodField()

    def get_announcements(self, obj):
        announcements = {}

        for (key, attr) in [("vk", "posted_vk"), ("fb", "posted_fb"), ("timepad", "posted_timepad")]:
            if getattr(obj, attr):
                announcements[key] = {
                    "link": getattr(obj, attr),
                }

        return announcements

    start = serializers.SerializerMethodField()
    end = serializers.SerializerMethodField()

    def get_start(self, obj):
        return obj.start_dt.strftime(MSK_DATE_FORMAT)

    def get_end(self, obj):
        return obj.end_dt.strftime(MSK_DATE_FORMAT)

    def to_representation(self, obj: models.Event):
        # Some precautions against information leaking (although we do more checks in /public_events API route).
        if obj.deleted:
            return {}
        if obj.event_type != 'public':
            return {}

        return super().to_representation(obj)


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Event
        fields = (
            'id',
            'summary',
            'title',
            'description',
            'location',  # raw location
            'room',  # cleaned up room value
            'start',
            'end',

            # for updates
            'start_ts',
            'end_ts',

            # for future migrations
            'start_dt',
            'end_dt',

            'created',
            'google_link',
            'type',
            'timepad_category_code',
            'timepad_prepaid_tickets',
            'timing_description_override',

            # optional
            'master_id',
            'is_master',
            'prototype_id',
            'vk_group',
            'fb_group',
            'ready_to_post',
            'visitors',
            'posted_vk',
            'posted_fb',
            'posted_timepad',
            'deleted',

            # method-based
            'images',
            'tags',
        )
        read_only_fields = tuple(
            # Listing editable fields instead of read-only fields for clearer code.
            f for f in fields if f not in (
                'title', 'location', 'description', 'summary',
                'start_ts',
                'end_ts',
                'visitors',
                'vk_group', 'fb_group',
                'posted_timepad', 'posted_fb', 'posted_vk',
                'timepad_category_code', 'timepad_description_override',
                'type',
                'ready_to_post',
                'timepad_prepaid_tickets',
                # TODO - other fields from Event.set_field_by_prop()
                # TODO: `start`, `end`, `asked_for_visitors`
            )
        )

    id = serializers.CharField(source='google_id', required=False)
    room = serializers.CharField(source='get_room', required=False)

    start = serializers.SerializerMethodField()
    end = serializers.SerializerMethodField()

    def get_start(self, obj):
        return {
            'dateTime': obj.start_dt.strftime(MSK_DATE_FORMAT),
        }

    def get_end(self, obj):
        return {
            'dateTime': obj.end_dt.strftime(MSK_DATE_FORMAT),
        }

    created = serializers.SerializerMethodField()

    def get_created(self, obj):
        return dts(obj.created_dt)

    type = serializers.CharField(source='event_type', required=False)

    images = serializers.SerializerMethodField()
    tags = serializers.SerializerMethodField()

    def get_images(self, obj):
        return obj.get_images()

    def get_tags(self, obj):
        return obj.tag_names()

    def create(self, validated_data):
        event = models.Event(**validated_data)
        kocherga.events.db.insert_event(event)
        return event

    def update(self, instance, validated_data):
        event = super().update(instance, validated_data)
        event.patch_google()
        return event
