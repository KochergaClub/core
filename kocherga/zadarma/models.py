import logging
logger = logging.getLogger(__name__)

from django.conf import settings
from django.db import models

from collections import OrderedDict
from datetime import datetime, timedelta
import requests
import enum
import hashlib
import hmac
import base64
import urllib
import itertools

from typing import Iterator

from kocherga.dateutils import TZ
import kocherga.dateutils
import kocherga.watchmen.tools
import kocherga.importer.base

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

class Call(models.Model):
    call_id = models.CharField(primary_key=True, max_length=100)
    pbx_call_id = models.CharField(max_length=100)

    ts = models.DateTimeField()
    call_type = models.CharField(max_length=15)
    disposition = models.CharField(max_length=40)
    clid = models.CharField(max_length=100, blank=True)
    destination = models.CharField(max_length=20)
    sip = models.CharField(max_length=100)
    seconds = models.IntegerField()
    is_recorded = models.IntegerField()
    watchman = models.CharField(max_length=100)

    class Meta:
        db_table = 'zadarma_calls'
        verbose_name = 'Звонок'
        verbose_name_plural = 'Звонки'

    def __str__(self):
        return f'[{self.ts}] {self.call_type} {self.clid} ---> {self.destination}'

    @classmethod
    def from_api_data(cls, data) -> "Call":
        args = {}
        for arg in ('call_id', 'pbx_call_id', 'disposition', 'clid', 'sip', 'seconds'):
            args[arg] = data[arg]

        call = Call(
            ts=datetime.strptime(data['callstart'], "%Y-%m-%d %H:%M:%S").replace(tzinfo=TZ),
            call_type=CallType.from_api_data(data).name,
            is_recorded=(data['is_recorded'] == 'true'),
            destination=str(data['destination']),
            **args,
        )

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

    credentials = settings.KOCHERGA_ZADARMA_CREDENTIALS
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
    for (chunk_from_dt, chunk_to_dt) in kocherga.dateutils.date_chunks(
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

    def do_period_import(self, from_dt: datetime, to_dt: datetime) -> datetime:
        last_call = None

        schedule = kocherga.watchmen.tools.load_schedule()

        for call in fetch_all_calls(from_dt, to_dt):
            watchman = schedule.watchman_by_dt(datetime.fromtimestamp(call.ts.timestamp(), TZ))
            call.watchman = watchman
            call.save()
            last_call = call

        if last_call:
            return datetime.fromtimestamp(last_call.ts.timestamp(), TZ)
        else:
            return from_dt
