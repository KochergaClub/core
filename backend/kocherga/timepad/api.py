import logging

logger = logging.getLogger(__name__)

from django.conf import settings

import requests

TIMEPAD_CONFIG = settings.KOCHERGA_TIMEPAD
ORGANIZATION_ID = TIMEPAD_CONFIG["organization_id"]

BASE_URL = "https://api.timepad.ru/v1"


def token():
    return settings.KOCHERGA_TIMEPAD_TOKEN


def api_call(method, url, payload={}):
    url = f"{BASE_URL}/{url}.json"
    logger.debug(url)
    headers = {
        'Authorization': 'Bearer ' + token(),
    }
    if method == "GET":
        r = requests.get(url, params=payload, headers=headers,)
    elif method == "POST":
        r = requests.post(url, headers=headers, json=payload,)
    else:
        raise Exception(f"Unknown method {method}")

    if r.status_code >= 400:
        raise Exception(f"Error: {r.status_code} {r.reason}\n\n{r.text}")
    r.raise_for_status()

    return r.json()
