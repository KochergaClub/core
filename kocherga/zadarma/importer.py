import logging
logger = logging.getLogger(__name__)

from datetime import datetime, timedelta
from typing import Iterator
import itertools

import kocherga.importer.base
from kocherga.dateutils import TZ
import kocherga.dateutils
import kocherga.watchmen.models
import kocherga.watchmen.schedule

from . import api
from .models import Call, PbxCall


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

        (pbx_call, pbx_call_created) = PbxCall.objects.get_or_create(
            pk=item['pbx_call_id'],
            defaults={
                # copy-pasted from Call.from_api_data
                'ts': datetime.strptime(item['callstart'], "%Y-%m-%d %H:%M:%S").replace(tzinfo=TZ),
            }
        )
        call = Call.from_api_data(pbx_call, item)
        yield call


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
        return datetime(2016, 11, 1, tzinfo=TZ)

    def do_period_import(self, from_dt: datetime, to_dt: datetime) -> datetime:
        last_call = None

        for call in fetch_all_calls(from_dt, to_dt):
            # TODO - move `watchman` from Call to PbxCall
            # TODO - voice recognition :)
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
