import requests

from django.conf import settings


def get_token():
    return settings.KOCHERGA_TELEGRAM_TOKEN


def api_call(method: str, params):
    token = get_token()
    r = requests.get(f"https://api.telegram.org/bot{token}/{method}", params=params)
    r.raise_for_status()
    return r.json()


def get_file(path: str) -> bytes:
    token = get_token()
    r = requests.get(f'https://api.telegram.org/file/bot{token}/{path}')
    r.raise_for_status()
    return r.content
