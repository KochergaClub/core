import logging

logger = logging.getLogger(__name__)

import csv
import requests
from collections import defaultdict, OrderedDict
from datetime import datetime, timedelta
import enum
import io
import hashlib
import hmac
import base64
import urllib
import itertools

from typing import DefaultDict, Dict, Iterator, List

from kocherga.config import TZ
import kocherga.db
import kocherga.datetime
import kocherga.secrets
import kocherga.watchmen
import kocherga.importer.base

from sqlalchemy import Column, Integer, String, Enum, DateTime, Boolean


class CallType(enum.Enum):
    incoming = 1
    outcoming = 2

    @classmethod
    def from_api_data(cls, data) -> "CallType":
        if data['pbx_call_id'].startswith('in_'):
            return cls.incoming
        if data['pbx_call_id'].startswith('out_'):
            return cls.outcoming
        raise Exception(f"Can't detect call type by data {data}")


class Call(kocherga.db.Base):
    __tablename__ = "zadarma_calls"

    call_id = Column(String(100), primary_key=True)
    pbx_call_id = Column(String(100), index=True, nullable=False)

    ts = Column(DateTime, nullable=False)
    call_type = Column(Enum(CallType))

    disposition = Column(String(40))

    clid = Column(String(100))
    destination = Column(String(20))
    sip = Column(String(100))

    seconds = Column(Integer)
    is_recorded = Column(Boolean)

    watchman = Column(String(100))

    @classmethod
    def from_api_data(cls, data) -> "Call":
        args = {}
        for arg in ('call_id', 'pbx_call_id', 'disposition', 'clid', 'sip', 'seconds'):
            args[arg] = data[arg]

        call = Call(
            ts=datetime.strptime(data['callstart'], "%Y-%m-%d %H:%M:%S"),
            call_type=CallType.from_api_data(data),
            is_recorded=(data['is_recorded'] == 'true'),
            destination=str(data['destination']),
            **args,
        )

        #if len(rows) == 2:
        #    row2 = rows[1]
        #    assert row2["call_id"] == row1["call_id"]
        #    if call.call_type != CallType.incoming:
        #        raise Exception(
        #            "Can't parse two-rows format for anything except incoming calls"
        #        )
        #    call.internal_number = row2["internal_number"]

        #    call.wait_seconds = call.seconds
        #    call.seconds = row2["seconds"]

        return call


def fetch_calls(from_dt: datetime, to_dt: datetime) -> Iterator[Call]:
    dt_format = '%Y-%m-%d %H:%M:%S'
    params=OrderedDict(
        sorted(
            {
                'start': from_dt.strftime(dt_format),
                'end': to_dt.strftime(dt_format),
                'version': 2,
                'format': 'json',
            }.items()
        )
    )

    credentials = kocherga.secrets.json_secret('zadarma_credentials')
    key = credentials['key']

    params_str = urllib.parse.urlencode(params)
    hmac_value = hmac.new(
        credentials['secret'].encode('utf-8'),
        (
            '/v1/statistics/pbx/'
            + params_str
            + hashlib.md5(params_str.encode('utf-8')).hexdigest()
        ).encode('utf-8'),
        hashlib.sha1
    ).hexdigest()
    signature = base64.b64encode(hmac_value.encode('utf-8')).decode('utf-8')

    r = requests.get(
        'https://api.zadarma.com/v1/statistics/pbx/?' + params_str,
        headers={
            'Authorization': f'{key}:{signature}'
        }
    )
    r.raise_for_status()
    itertools.groupby(r.json()['stats'])
    for item in r.json()['stats']:
        yield Call.from_api_data(item)


def fetch_all_calls(
    from_dt=datetime(2016, 4, 1, tzinfo=TZ), to_dt=None
) -> Iterator[Call]:
    api_requests = 0
    for (chunk_from_dt, chunk_to_dt) in kocherga.datetime.date_chunks(
        from_dt, to_dt, timedelta(days=28)
    ):
        logger.info(f"Fetching from {chunk_from_dt} to {chunk_to_dt}")
        counter = 0
        for call in fetch_calls(chunk_from_dt, chunk_to_dt):
            yield call
            counter += 1
        logger.info(f"Fetched {counter} calls")

        # We shouldn't make too many API requests in a row - we'll get banned.
        # This early break helps the importer to finish the full import in several portions.
        api_requests += 1
        if api_requests >= 10:
            break


class Importer(kocherga.importer.base.IncrementalImporter):

    def get_initial_dt(self):
        return datetime(2016, 11, 1, tzinfo=TZ)

    def do_period_import(self, from_dt: datetime, to_dt: datetime, session) -> datetime:
        last_call = None

        schedule = kocherga.watchmen.load_schedule()

        for call in fetch_all_calls(from_dt, to_dt):
            watchman = schedule.watchman_by_dt(datetime.fromtimestamp(call.ts.timestamp(), TZ))
            call.watchman = watchman
            session.merge(call)
            last_call = call

        if last_call:
            return datetime.fromtimestamp(last_call.ts.timestamp(), TZ)
        else:
            return from_dt
