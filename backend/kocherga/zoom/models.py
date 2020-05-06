from random import randint
import dateutil.parser

from django.db import models
from django.conf import settings

from .api import api_call

ANNOUNCER_USER_ID = settings.ZOOM_ANNOUNCER_USER_ID


class MeetingManager(models.Manager):
    def schedule(self, topic, start_dt, duration):
        result = api_call('POST', f'users/{ANNOUNCER_USER_ID}/meetings', {
            "topic": topic,
            "type": 2,
            "start_time": start_dt.strftime('%Y-%m-%dT%H:%M:00Z'),
            # "timezone": "Europe/Moscow",
            "duration": duration,
            "password": randint(1, 999999),
            "settings": {
                "host_video": True,
                "participant_video": True,
                "join_before_host": True,
                "waiting_room": False,
            }
        })

        return self.create(
            zoom_id=result['id'],
            start_time=dateutil.parser.isoparse(result['start_time']),
            join_url=result['join_url'],
        )


class Meeting(models.Model):
    # id and uuid are different: https://devforum.zoom.us/t/meeting-id-versus-uuid-confusion/5764/2
    # It's kinda messy, so let's avoid recurring meetings in the future if possible.
    zoom_id = models.CharField(max_length=20)
    zoom_uuid = models.CharField(max_length=100, blank=True)

    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)

    participants_count = models.IntegerField(null=True)
    duration = models.IntegerField(null=True)

    join_url = models.CharField(max_length=255, blank=True)

    objects = MeetingManager()

    def update_from_zoom(self):
        # TODO - populate other fields
        result = api_call('GET', f'meetings/{self.zoom_id}')
        self.join_url = result['join_url']
        self.save()
