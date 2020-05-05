from random import randint

from .api import api_call

from django.conf import settings

ANNOUNCER_USER_ID = settings.ZOOM_ANNOUNCER_USER_ID


def schedule_meeting(topic, start_dt, duration):
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

    return result['join_url']
