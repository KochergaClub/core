from rest_framework import serializers

from kocherga.dateutils import MSK_DATE_FORMAT
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
        if obj.deleted:
            return {}
        if obj.event_type != 'public':
            return {}

        return super().to_representation(obj)
