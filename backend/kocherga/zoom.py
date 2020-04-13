from random import randint
import datetime

import requests
import jwt

from django.conf import settings

ANNOUNCER_USER_ID = settings.ZOOM_ANNOUNCER_USER_ID


def get_jwt_token():
    return jwt.encode(
        payload={
            "iss": settings.ZOOM_API_KEY,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1),
        },
        key=settings.ZOOM_API_SECRET,
        algorithm="HS256",
    ).decode("utf-8")


def schedule_meeting(topic, start_dt, duration):
    r = requests.post(
        f'https://api.zoom.us/v2/users/{ANNOUNCER_USER_ID}/meetings',
        json={
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
        },
        headers={
            'Authorization': 'Bearer ' + get_jwt_token(),
        }
    )

    if r.status_code >= 400:
        # print(r.body)
        r.raise_for_status()

    join_url = r.json()['join_url']
    return join_url
