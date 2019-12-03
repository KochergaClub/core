import logging
logger = logging.getLogger(__name__)

from django.conf import settings

import time
import requests
from datetime import date
from typing import Any, Iterable

from .auth import get_access_token, update_tokens
from .models import Record

TOCHKA_API = settings.KOCHERGA_MONEY_TOCHKA_API


def call(http_method, url, data={}):
    access_token = get_access_token()

    allowed_methods = {'GET': 'get', 'POST': 'post'}
    if http_method not in allowed_methods:
        raise Exception(f"Unknown method {http_method}")

    method = allowed_methods[http_method]
    extra_args = {}

    if method == 'post':
        extra_args['json'] = data

    def _call():
        return getattr(requests, method)(
            f"{TOCHKA_API}/{url}",
            headers={
                "Authorization": f"Bearer {access_token}"
            },
            **extra_args
        )

    r = _call()
    if r.status_code == 403:
        # This code should help, but it doesn't.
        # Even though tochka's documentation promises 30 days of life for refresh token,
        # in reality it declines a refresh_token as soon as access_token stops working (i.e. in 24 hours).
        #
        # So we implement an extra update after 12 hours in get_access_token()
        update_tokens()
        r = _call()  # try again

    r.raise_for_status()

    return r.json()


def get_account_info() -> str:
    accounts = call('GET', 'account/list')

    accounts = [
        a for a in accounts
        if a['code'][5:8] == '810'  # RUB
    ]

    # sandbox returns multiple RUB accounts
    if 'sandbox' in TOCHKA_API:
        accounts = accounts[:1]

    assert len(accounts) == 1

    return (accounts[0]['code'], accounts[0]['bank_code'])


def get_statements(from_d: date, to_d: date) -> Iterable[Any]:
    (account_id, bank_code) = get_account_info()

    response = call('POST', 'statement', {
        'account_code': account_id,
        'bank_code': bank_code,
        'date_start': from_d.strftime('%Y-%m-%d'),
        'date_end': to_d.strftime('%Y-%m-%d'),
    })
    request_id = response['request_id']

    step = 1
    max_step = 10
    max_wait = 60
    total_wait = 0

    while total_wait < max_wait:
        response = call('GET', f'statement/status/{request_id}')
        state = response['status']
        logger.info(f"State: {state}")
        if state == "ready":
            break
        elif state == "queued":
            step = min(step, max_wait - total_wait)
            logger.info(f"No statement, waiting for {step} seconds")
            time.sleep(step)
            total_wait += step
            if step < max_step:
                step = min(step + 1, max_step)
            if step > max_step or total_wait > max_wait:
                raise Exception(f"Waited for {total_wait} seconds and still got no statement")
        else:
            raise Exception(f"Bad or unknown status: {state}")

    response = call('GET', f'statement/result/{request_id}')
    for payment in response['payments']:
        yield Record.from_element(payment)
