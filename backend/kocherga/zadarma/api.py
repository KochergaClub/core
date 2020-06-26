import urllib.parse
import hmac
import hashlib
import base64
from collections import OrderedDict

import requests

from django.conf import settings


def api_call(method, url, params):
    params = params.copy()
    params.update({'format': 'json'})
    params = OrderedDict(sorted(params.items()))

    if method != 'GET':
        raise Exception("Only GET calls are implemented")

    credentials = settings.KOCHERGA_ZADARMA_CREDENTIALS
    key = credentials['key']

    params_str = urllib.parse.urlencode(params)
    hmac_value = hmac.new(
        credentials['secret'].encode('utf-8'),
        (
            f'/v1/{url}/'
            + params_str
            + hashlib.md5(params_str.encode('utf-8')).hexdigest()
        ).encode('utf-8'),
        hashlib.sha1,
    ).hexdigest()
    signature = base64.b64encode(hmac_value.encode('utf-8')).decode('utf-8')

    r = requests.get(
        f'https://api.zadarma.com/v1/{url}/?{params_str}',
        headers={'Authorization': f'{key}:{signature}'},
    )
    r.raise_for_status()
    return r.json()
