import requests

from django.conf import settings


def get_token():
    return settings.KOCHERGA_TELEGRAM_TOKEN


def get_channel_id():
    return settings.KOCHERGA_TELEGRAM["channel"]


def post_to_channel(message):
    token = get_token()
    r = requests.get(
        f"https://api.telegram.org/bot{token}/sendMessage",
        params={
            "chat_id": get_channel_id(),
            "text": message,
            "parse_mode": "html",
            "disable_web_page_preview": "true",
        },
    )
    r.raise_for_status()
