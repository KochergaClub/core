import requests

import kocherga.config
import kocherga.secrets


def get_token():
    return kocherga.secrets.plain_secret("telegram_token")


def get_channel_id():
    return kocherga.config.config()["telegram"]["channel"]


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
