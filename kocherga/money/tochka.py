import logging

logger = logging.getLogger(__name__)

import requests
from datetime import date, datetime, timedelta
import time
import dbm

from sqlalchemy import Column, Integer, String, Text, Numeric, Boolean

from typing import Any, List, Iterable

import kocherga.secrets
import kocherga.db
import kocherga.datetime
from kocherga.config import TZ
import kocherga.importer.base

# Docs: https://enter.tochka.com/doc/v1/index.html
TOCHKA_API = kocherga.config.config()['money']['tochka']['api']
TOKENS_FILE = kocherga.config.config()['money']['tochka']['tokens_file']


class Record(kocherga.db.Base):
    __tablename__ = "tochka_records"
    id = Column(String(100), primary_key=True)
    ts = Column(Integer)
    purpose = Column(Text)
    document_type = Column(Integer)
    total = Column(Numeric(10, 2))

    @classmethod
    def from_element(cls, record):
        dt = datetime.strptime(record['payment_date'], '%d.%m.%Y')

        return cls(
            id=record.get("x_payment_id"),
            ts=dt.timestamp(),
            purpose=record.get("payment_purpose"),
            total=float(record.get("payment_amount")),
            document_type=int(record.get("operation_type")),
        )


def save_tokens(response_json):
    with dbm.open(TOKENS_FILE, 'c') as db:
        db['refresh_token'] = response_json['refresh_token']
        db['access_token'] = response_json['access_token']


# Interactive function, run this from CLI once.
def init_tokens():
    credentials = kocherga.secrets.json_secret('tochka_client')
    url = f"{TOCHKA_API}/authorize?response_type=code&client_id={credentials['client_id']}"
    print(f"Open this url: {url}")
    code = input("Enter the authorization code here: ")

    r = requests.post(
        f"{TOCHKA_API}/oauth2/token",
        json={
            "client_id": credentials["client_id"],
            "client_secret": credentials["client_secret"],
            "grant_type": "authorization_code",
            "code": code,
        },
    )
    print(r.json())
    r.raise_for_status()

    save_tokens(r.json())


def update_tokens():
    credentials = kocherga.secrets.json_secret('tochka_client')
    with dbm.open(TOKENS_FILE, 'w') as db:
        r = requests.post(
            f"{TOCHKA_API}/oauth2/token",
            json={
                "client_id": credentials["client_id"],
                "client_secret": credentials["client_secret"],
                "grant_type": "refresh_token",
                "refresh_token": db["refresh_token"].decode('utf-8'),
            },
        )
        r.raise_for_status()

        save_tokens(r.json())

def get_access_token():
    access_token = None
    with dbm.open(TOKENS_FILE, 'r') as db:
        access_token = db['access_token'].decode('utf-8')

    # TODO - check and update if necessary?
    return access_token


def call(method, url, data={}):
    access_token = get_access_token()
    if method == "GET":
        r = requests.get(
            f"{TOCHKA_API}/{url}",
            headers={
                "Authorization": f"Bearer {access_token}"
            },
        )
    elif method == "POST":
        r = requests.post(
            f"{TOCHKA_API}/{url}",
            headers={
                "Authorization": f"Bearer {access_token}",
            },
            json=data,
        )
    else:
        raise Exception(f"Unknown method {method}")

    r.raise_for_status()

    return r.json()


def get_account_info() -> str:
    accounts = call('GET', 'account/list')

    accounts = [
        a for a in accounts
        if a['code'][5:8] == '810' # RUB
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
    statement = None
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


class Importer(kocherga.importer.base.IncrementalImporter):

    def get_initial_dt(self):
        return datetime(2015, 8, 1, tzinfo=TZ)

    def do_period_import(self, from_dt: datetime, to_dt: datetime, session) -> datetime:
        for (chunk_from_dt, chunk_to_dt) in kocherga.datetime.date_chunks(
            from_dt, to_dt, step=timedelta(days=28)
        ):
            chunk_from_d = (chunk_from_dt - timedelta(days=2)).date()
            chunk_to_d = chunk_to_dt.date()
            logger.info(f"Importing from {chunk_from_d} to {chunk_to_d}")
            for record in get_statements(chunk_from_d, chunk_to_d):
                session.merge(record)

        return to_dt - timedelta(
            days=1
        )  # I'm not sure if tochka statements change after some time or are immutable
