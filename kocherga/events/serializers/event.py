from rest_framework import serializers
from django.conf import settings

import kocherga.room

from .. import models
from .. import markup


class PublicEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Event
        fields = ('event_id', 'title', 'summary', 'description', 'room', 'announcements', 'start', 'end', 'image')

    image = serializers.SerializerMethodField()

    def get_image(self, obj):
        if obj.image:
            return settings.KOCHERGA_API_ROOT + f"/images/{obj.image}"
        else:
            return None

    description = serializers.SerializerMethodField()

    def get_description(self, obj):
        return markup.Markup(obj.description).as_plain()

    event_id = serializers.ReadOnlyField(source='google_id')

    room = serializers.SerializerMethodField()

    def get_room(self, obj):
        return kocherga.room.pretty(obj.get_room())

    announcements = serializers.SerializerMethodField()

    def get_announcements(self, obj):
        announcements = {}

        for key in ('vk', 'fb', 'timepad'):
            attr = f'{key}_announcement'
            if hasattr(obj, attr):
                announcement = getattr(obj, attr)
                if announcement.link:
                    announcements[key] = {
                        "link": announcement.link,
                    }

        return announcements

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
            'created',
            'google_link',
            'type',
            'timing_description_override',

            # optional
            'master_id',
            'is_master',
            'prototype_id',
            'ready_to_post',
            'visitors',
            'deleted',

            # announcement-related
            'timepad_category_code',
            'timepad_prepaid_tickets',
            'vk_group',
            'fb_group',
            'posted_vk',
            'posted_fb',
            'posted_timepad',

            # method-based
            'images',
            'tags',
        )
        read_only_fields = tuple(
            # Listing editable fields instead of read-only fields for clearer code.
            f for f in fields if f not in (
                'title', 'location', 'description', 'summary',
                'start', 'end',
                'visitors',
                'vk_group', 'fb_group',
                'posted_timepad', 'posted_fb', 'posted_vk',
                'timepad_prepaid_tickets', 'timepad_category_code', 'timing_description_override',
                'type',
                'ready_to_post',
                # TODO - other fields from Event.set_field_by_prop()
                # TODO: `start`, `end`, `asked_for_visitors`
            )
        )

    id = serializers.CharField(source='google_id', required=False)
    room = serializers.CharField(source='get_room', required=False)

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
        models.Event.objects.notify_update()  # send notification message to websocket
        return event

    def update(self, instance, validated_data):
        vk_announcement_data = validated_data.pop('vk_announcement', {})
        fb_announcement_data = validated_data.pop('fb_announcement', {})
        timepad_announcement_data = validated_data.pop('timepad_announcement', {})

        event = super().update(instance, validated_data)
        event.patch_google()

        if vk_announcement_data:
            event.vk_announcement.group = vk_announcement_data.get('group', event.vk_announcement.group)
            event.vk_announcement.link = vk_announcement_data.get('link', event.vk_announcement.link)
            event.vk_announcement.save()

        if fb_announcement_data:
            event.fb_announcement.group = fb_announcement_data.get('group', event.fb_announcement.group)
            event.fb_announcement.link = fb_announcement_data.get('link', event.fb_announcement.link)
            event.fb_announcement.save()

        if timepad_announcement_data:
            event.timepad_announcement.category_code = timepad_announcement_data.get(
                'category_code',
                event.timepad_announcement.category_code
            )
            event.timepad_announcement.prepaid_tickets = timepad_announcement_data.get(
                'prepaid_tickets',
                event.timepad_announcement.prepaid_tickets
            )
            event.timepad_announcement.link = timepad_announcement_data.get('link', timepad_announcement_data.link)
            event.timepad_announcement.save()

        models.Event.objects.notify_update()  # send notification message to websocket
        return event

    # Deprecated fields which should be serialized through nested serializers instead.
    timepad_category_code = serializers.CharField(source='timepad_announcement.category_code', required=False)
    timepad_prepaid_tickets = serializers.BooleanField(source='timepad_announcement.prepaid_tickets', required=False)
    posted_timepad = serializers.CharField(source='timepad_announcement.link', required=False)

    fb_group = serializers.CharField(source='fb_announcement.group', required=False)
    posted_fb = serializers.CharField(source='fb_announcement.link', required=False)

    vk_group = serializers.CharField(source='vk_announcement.group', required=False)
    posted_vk = serializers.CharField(source='vk_announcement.link', required=False)
