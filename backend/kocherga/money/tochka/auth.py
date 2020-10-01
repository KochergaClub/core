import logging

logger = logging.getLogger(__name__)

from django.conf import settings
from django.utils import timezone
from datetime import timedelta

import requests

from .models import Auth

TOCHKA_API = settings.KOCHERGA_MONEY_TOCHKA_API
CREDENTIALS = settings.KOCHERGA_MONEY_TOCHKA_CLIENT


# Interactive function, run this from CLI once.
def init_tokens():
    url = f"{TOCHKA_API}/authorize?response_type=code&client_id={CREDENTIALS['client_id']}"
    print(f"Open this url: {url}")
    code = input("Enter the authorization code here: ")

    r = requests.post(
        f"{TOCHKA_API}/oauth2/token",
        json={
            "client_id": CREDENTIALS["client_id"],
            "client_secret": CREDENTIALS["client_secret"],
            "grant_type": "authorization_code",
            "code": code,
        },
    )
    r.raise_for_status()

    response_json = r.json()
    Auth.objects.create(
        access_token=response_json['access_token'],
        refresh_token=response_json['refresh_token'],
    )


def update_tokens():
    logger.info('Updating tokens')

    auth = Auth.get()
    r = requests.post(
        f"{TOCHKA_API}/oauth2/token",
        json={
            "client_id": CREDENTIALS["client_id"],
            "client_secret": CREDENTIALS["client_secret"],
            "grant_type": "refresh_token",
            "refresh_token": auth.refresh_token,
        },
    )
    r.raise_for_status()

    response_json = r.json()
    auth.access_token = response_json['access_token']
    auth.refresh_token = response_json['refresh_token']
    auth.save()


def get_access_token():
    if Auth.get().dt < timezone.now() - timedelta(hours=12):
        update_tokens()

    return Auth.get().access_token
