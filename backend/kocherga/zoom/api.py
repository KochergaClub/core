import logging

logger = logging.getLogger(__name__)

import datetime

import jwt
import requests

from django.conf import settings


def get_jwt_token():
    return jwt.encode(
        payload={
            "iss": settings.ZOOM_API_KEY,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1),
        },
        key=settings.ZOOM_API_SECRET,
        algorithm="HS256",
    ).decode("utf-8")


def api_call(method, url, data={}):
    headers = {
        'Authorization': 'Bearer ' + get_jwt_token(),
    }
    if method == 'POST':
        r = requests.post(f'https://api.zoom.us/v2/{url}', json=data, headers=headers,)
    elif method == 'GET':
        r = requests.get(f'https://api.zoom.us/v2/{url}', params=data, headers=headers,)
    else:
        raise Exception(f"Unknown method {method}")

    if r.status_code >= 400:
        logger.warn(r.content)
        r.raise_for_status()

    return r.json()
