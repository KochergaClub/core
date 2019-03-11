import requests

from .models import Auth

from typing import List


def get_by_id(object_id: str, fields: List[str]) -> dict:
    auth = Auth.objects.get()
    auth.validate()

    r = requests.get(
        f"https://graph.facebook.com/v2.12/{object_id}",
        params={
            "access_token": auth.access_token,
            "fields": ','.join(fields),
        },
    )
    r.raise_for_status()
    return r.json()
