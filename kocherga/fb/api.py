import requests

from .models import Auth

from typing import List

from .constants import SERVER, API_VERSION


def available():
    auth = Auth.objects.get()
    auth.validate()


def get_by_id(object_id: str, fields: List[str]) -> dict:
    auth = Auth.objects.get()

    r = requests.get(
        f"{SERVER}/{API_VERSION}/{object_id}",
        params={
            "access_token": auth.access_token,
            "fields": ','.join(fields),
        },
    )
    r.raise_for_status()
    return r.json()
