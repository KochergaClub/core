import logging
logger = logging.getLogger(__name__)

from datetime import datetime, date, timedelta
import dateutil.parser

from django.conf import settings

import kocherga.importer.base
from kocherga.dateutils import TZ, date_chunks

from .api import api_call
from .models import Meeting, MeetingInstance


def import_meetings(from_d: date, to_d: date):
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

    for instance_data in result['meetings']:
        # Note: instance_data is not a meeting, but a meeting instance.
        # It means that its `start_time` and `end_time` fields are not aligned with the schedule, and also that there
        # might be multiple instances per meeting, even if we don't use recurring meetings, because participants might
        # all join, leave, and join again (which counts as a new instance by Zoom).
        zoom_id = str(instance_data['id'])
        meeting = Meeting.objects.get_with_import(zoom_id=zoom_id)

        (meeting_instance, created) = MeetingInstance.objects.update_or_create(
            zoom_uuid=str(instance_data['uuid']),
            defaults={
                'meeting': meeting,
                'start_time': dateutil.parser.isoparse(instance_data['start_time']),
                'end_time': dateutil.parser.isoparse(instance_data['end_time']),
            }
        )
        if created or not meeting_instance.participants.all():
            meeting_instance.update_participants()
            # TODO - can fail with 404 for old meetings
            # meeting.update_from_zoom()


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
            import_meetings(chunk_from_d, chunk_to_d)

        return to_dt - timedelta(
            days=1
        )
