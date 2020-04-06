from random import randint
import requests

from django.conf import settings

ANNOUNCER_USER_ID = settings.ZOOM_ANNOUNCER_USER_ID
TOKEN = settings.ZOOM_JWT_TOKEN


def schedule_meeting(topic, start_dt, duration):
    r = requests.post(
        f'https://api.zoom.us/v2/users/{ANNOUNCER_USER_ID}/meetings',
        json={
            "topic": topic + ' | Кочерга',
            "type": 2,
            "start_time": start_dt.strftime('%Y-%m-%dT%H:%M:00Z'),
            # "timezone": "Europe/Moscow",
            "duration": duration,
            "password": randint(1, 999999),
            "settings": {
                "host_video": True,
                "participant_video": True,
                "join_before_host": False,
            }
        },
        headers={
            'Authorization': 'Bearer ' + TOKEN
        }
    )

    if r.status_code >= 400:
        # print(r.body)
        r.raise_for_status()

    join_url = r.json()['join_url']
    return join_url
