import logging
logger = logging.getLogger(__name__)

from datetime import datetime, date, timedelta
import dateutil.parser

from django.conf import settings

import kocherga.importer.base
from kocherga.dateutils import TZ, date_chunks

from .api import api_call
from .models import Meeting


def get_meetings(from_d: date, to_d: date):
    result = api_call(
        'GET',
        f'report/users/{settings.ZOOM_ANNOUNCER_USER_ID}/meetings',
        {
            'from': str(from_d),
            'to': str(to_d),
            'page_size': 300,
        }
    )

    if result['next_page_token']:
        raise Exception("Zoom wants paging, which is not implemented")

    for meeting_data in result['meetings']:
        (meeting, created) = Meeting.objects.update_or_create(
            zoom_uuid=meeting_data['uuid'],
            defaults={
                'zoom_id': str(meeting_data['id']),
                'start_time': dateutil.parser.isoparse(meeting_data['start_time']),
                'end_time': dateutil.parser.isoparse(meeting_data['end_time']),
                'duration': meeting_data['duration'],
                'participants_count': meeting_data['participants_count'],
            }
        )
        if created:
            pass
            # TODO - can fail with 404 for old meetings
            # meeting.update_from_zoom()
        yield meeting


class Importer(kocherga.importer.base.IncrementalImporter):
    def get_initial_dt(self):
        return datetime(2020, 3, 1, tzinfo=TZ)

    def do_period_import(self, from_dt: datetime, to_dt: datetime) -> datetime:
        for (chunk_from_dt, chunk_to_dt) in date_chunks(
            from_dt, to_dt, step=timedelta(days=28)
        ):
            chunk_from_d = (chunk_from_dt - timedelta(days=2)).date()
            chunk_to_d = chunk_to_dt.date()
            logger.info(f"Importing from {chunk_from_d} to {chunk_to_d}")
            for meeting in get_meetings(chunk_from_d, chunk_to_d):
                pass  # already saved

        return to_dt - timedelta(
            days=1
        )
