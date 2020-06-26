import logging

logger = logging.getLogger(__name__)

from random import randint
import urllib.parse
import requests
import dateutil.parser

from django.db import models
from django.conf import settings

from .api import api_call

ANNOUNCER_USER_ID = settings.ZOOM_ANNOUNCER_USER_ID


class MeetingManager(models.Manager):
    def get_with_import(self, zoom_id):
        try:
            result = api_call('GET', f'meetings/{zoom_id}')
        except requests.HTTPError as e:
            if e.response.status_code != 404:
                raise
            result = api_call('GET', f'report/meetings/{zoom_id}')

        (meeting, _) = self.update_or_create(
            zoom_id=zoom_id,
            defaults={
                'start_time': dateutil.parser.isoparse(result['start_time']),
                'duration': result['duration'],
                'join_url': result.get('join_url', ''),
            },
        )
        return meeting

    def schedule(self, topic, start_dt, duration):
        result = api_call(
            'POST',
            f'users/{ANNOUNCER_USER_ID}/meetings',
            {
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
                },
            },
        )

        return self.create(
            zoom_id=result['id'],
            start_time=dateutil.parser.isoparse(result['start_time']),
            duration=duration,
            join_url=result['join_url'],
        )


class Meeting(models.Model):
    # id and uuid are different: https://devforum.zoom.us/t/meeting-id-versus-uuid-confusion/5764/2
    # It's kinda messy, so let's avoid recurring meetings in the future if possible.
    zoom_id = models.CharField(max_length=20, unique=True)

    start_time = models.DateTimeField()
    duration = models.IntegerField(null=True)

    join_url = models.CharField(max_length=255, blank=True)

    objects = MeetingManager()

    class Meta:
        permissions = (
            ('view_participants', 'Может просматривать участников созвонов'),
        )

    def update_from_zoom(self):
        # TODO - populate other fields
        result = api_call('GET', f'meetings/{self.zoom_id}')
        self.join_url = result['join_url']
        self.save()

    def update_instances(self):
        raise Exception("TODO")

    @property
    def participants_count(self):
        return sum(instance.participants.count() for instance in self.instances.all())


class MeetingInstance(models.Model):
    zoom_uuid = models.CharField(max_length=100)
    meeting = models.ForeignKey(
        Meeting, on_delete=models.CASCADE, related_name='instances',
    )

    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    def update_participants(self):
        uuid = self.zoom_uuid
        if '//' in uuid or uuid[0] == '/':
            uuid = urllib.parse.quote_plus(urllib.parse.quote_plus(uuid))

        logger.info(f'fetching participants for {uuid}')
        result = api_call(
            'GET', f'report/meetings/{uuid}/participants', {'page_size': 300}
        )

        if result['page_count'] != 1:
            raise Exception("Can't fetch multi-page report")

        for item in result['participants']:
            Participant.objects.get_or_create(
                meeting_instance=self,
                zoom_user_id=item['user_id'],
                defaults={
                    'zoom_id': item['id'],
                    'name': item['name'],
                    'user_email': item['user_email'],
                    'join_time': dateutil.parser.isoparse(item['join_time']),
                    'leave_time': dateutil.parser.isoparse(item['leave_time']),
                    'duration': item['duration'],
                },
            )


class Participant(models.Model):
    meeting_instance = models.ForeignKey(
        MeetingInstance, on_delete=models.CASCADE, related_name='participants'
    )

    # Empirically, id ("Participant UUID" in Zoom API docs) stays the same for the same meeting,
    # while user_id ("Participant ID") changes.
    zoom_id = models.CharField(max_length=40)
    zoom_user_id = models.CharField(max_length=40)

    name = models.CharField(max_length=256)
    user_email = models.CharField(max_length=256)

    join_time = models.DateTimeField()
    leave_time = models.DateTimeField()
    duration = models.IntegerField()
