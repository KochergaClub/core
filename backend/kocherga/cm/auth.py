import requests
import json

from django.conf import settings

from . import models

DOMAIN = settings.CAFE_MANAGER_SERVER


def get_new_cookies(login, password):
    r = requests.post(DOMAIN, data={"login": login, "pass": password})
    r.raise_for_status()
    return r.cookies


def update_cookies():
    auth = settings.CAFE_MANAGER_CREDENTIALS

    cookies = get_new_cookies(auth["login"], auth["password"])

    models.Auth.objects.get_or_create(
        id=1, defaults={'cookies': json.dumps(cookies.get_dict())}
    )


def get_cookies():
    cookies_json = models.Auth.get().cookies
    cookies = requests.cookies.RequestsCookieJar()
    cookies.update(json.loads(cookies_json))

    return cookies
