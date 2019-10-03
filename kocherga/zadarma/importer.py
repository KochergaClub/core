import logging
logger = logging.getLogger(__name__)

from datetime import datetime, timedelta
from typing import Optional

import kocherga.importer.base
from kocherga.dateutils import TZ
import kocherga.dateutils

from . import api
from .models import Call, PbxCall


def process_call_item(item) -> Call:
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
    return call


def fetch_calls(from_dt: datetime, to_dt: datetime) -> (int, Optional[Call]):
    dt_format = '%Y-%m-%d %H:%M:%S'

    response = api.api_call('GET', 'statistics/pbx', {
        'start': from_dt.strftime(dt_format),
        'end': to_dt.strftime(dt_format),
        'version': 2,
    })

    count = 0
    last_call = None
    for item in response['stats']:
        last_call = process_call_item(item)
        count += 1

    return (count, last_call)


def fetch_all_calls(from_dt: datetime, to_dt: datetime) -> Optional[Call]:
    api_requests = 0
    last_call = None
    for (chunk_from_dt, chunk_to_dt) in kocherga.dateutils.date_chunks(
        from_dt, to_dt, timedelta(days=28)
    ):
        logger.info(f"Fetching from {chunk_from_dt} to {chunk_to_dt}")
        (count, last_call) = fetch_calls(chunk_from_dt, chunk_to_dt)
        logger.info(f"Fetched {count} calls")

        # We shouldn't make too many API requests in a row - we'll get banned.
        # This early break helps the importer to finish the full import in several portions.
        api_requests += 1
        if api_requests >= 10:
            break

    return last_call


class Importer(kocherga.importer.base.IncrementalImporter):

    def get_initial_dt(self):
        return datetime(2016, 11, 1, tzinfo=TZ)

    def do_period_import(self, from_dt: datetime, to_dt: datetime) -> datetime:
        last_call = fetch_all_calls(from_dt, to_dt)

        if last_call:
            return datetime.fromtimestamp(last_call.ts.timestamp(), TZ)
        else:
            return from_dt
