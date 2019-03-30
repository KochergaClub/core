import logging
logger = logging.getLogger(__name__)

from datetime import datetime, timedelta
import enum
import itertools

from typing import Iterator

import requests

from django.db import models

from kocherga.dateutils import TZ
import kocherga.dateutils
import kocherga.watchmen.schedule
import kocherga.watchmen.models
import kocherga.importer.base

from . import api


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


def call_path(call, filename):
    return f'zadarma/calls/records/{call.call_id}.mp3'


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

    record = models.FileField(blank=True, upload_to=call_path)

    class Meta:
        db_table = 'zadarma_calls'
        verbose_name = 'Звонок'
        verbose_name_plural = 'Звонки'
        ordering = ['-ts']
        permissions = (
            ('listen', 'Может слушать  звонки'),
        )

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

        if 'record_link' in data:
            r = requests.get(data['record_link'])
            r.raise_for_status()
            from io import BytesIO
            call.record.save('record.mp3', BytesIO(r.content))

        return call


def fetch_calls(from_dt: datetime, to_dt: datetime) -> Iterator[Call]:
    dt_format = '%Y-%m-%d %H:%M:%S'

    response = api.api_call('GET', 'statistics/pbx', {
        'start': from_dt.strftime(dt_format),
        'end': to_dt.strftime(dt_format),
        'version': 2,
    })

    itertools.groupby(response['stats'])
    for item in response['stats']:
        if item['is_recorded'] == 'true':
            record = api.api_call('GET', 'pbx/record/request', {
                'call_id': item['call_id'],
            })
            assert record['status'] == 'success'
            item['record_link'] = record['link']

        yield Call.from_api_data(item)


def fetch_all_calls(from_dt, to_dt) -> Iterator[Call]:
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
        # return datetime(2016, 11, 1, tzinfo=TZ)
        return datetime(2019, 3, 23, tzinfo=TZ)

    def do_period_import(self, from_dt: datetime, to_dt: datetime) -> datetime:
        last_call = None

        for call in fetch_all_calls(from_dt, to_dt):
            try:
                shift = kocherga.watchmen.schedule.shift_by_dt(
                    datetime.fromtimestamp(call.ts.timestamp(), TZ)
                )
                if shift.watchman:
                    call.watchman = shift.watchman.short_name
            except kocherga.watchmen.models.Shift.DoesNotExist:
                pass  # that's ok

            call.save()
            last_call = call

        if last_call:
            return datetime.fromtimestamp(last_call.ts.timestamp(), TZ)
        else:
            return from_dt
