import requests

from .models import Auth

from typing import List

from .constants import SERVER, API_VERSION


def available():
    auth = Auth.objects.get()
    auth.validate()


def get(endpoint: str, fields=None, token=None) -> dict:
    params = {}

    params['access_token'] = token or Auth.objects.get().access_token

    if fields:
        params['fields'] = ','.join(fields)

    r = requests.get(f"{SERVER}/{API_VERSION}/{endpoint}", params=params,)
    r.raise_for_status()
    return r.json()


def post(endpoint: str, data={}, token=None) -> dict:
    params = {}
    params['access_token'] = token or Auth.objects.get().access_token

    r = requests.post(f"{SERVER}/{API_VERSION}/{endpoint}", params=params, json=data,)
    r.raise_for_status()
    return r.json()


def get_by_id(object_id: str, fields: List[str]) -> dict:
    return get(object_id, fields)
