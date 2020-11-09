from typing import Any, Dict

import requests

from django.conf import settings

API_URL = "https://api.ofd-ya.ru/ofdapi"
TOKEN = settings.KOCHERGA_MONEY_OFD_YA_TOKEN


def api_call(method: str, params: Dict[str, Any] = {}):
    """
    Documentation: https://ofd-ya.ru/docs/API_OFD_YA.pdf
    """
    r = requests.post(
        f"{API_URL}/{method}",
        headers={"Ofdapitoken": TOKEN, "Content-Type": "application/json"},
        json=params,
    )
    r.raise_for_status()
    return r.json()
