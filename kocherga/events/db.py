import logging
logger = logging.getLogger(__name__)

from typing import Dict, Any

from datetime import datetime, timedelta

from kocherga.datetime import TZ, MSK_DATE_FORMAT

from kocherga.error import PublicError

import kocherga.events.google
from kocherga.events.event import Event, IMAGE_TYPES
from kocherga.images import image_storage
import kocherga.importer.base


def get_event(event_id):
    event = Event.objects.get(pk=event_id)
    return event


def list_events(**kwargs):
    google_events = kocherga.events.google.list_events(**kwargs)

    order_arg = None
    if kwargs.get("order_by", None) == "updated":
        order_args = 'updated_ts'
    else:
        order_args = 'start_ts'

    events = (
        Event.objects
        .filter(
            google_id__in=[ge["id"] for ge in google_events],
            deleted=False,
        )
        .order_by(order_args)
        .all()
    )

    return list(events)


def insert_event(event):
    if event.google_id:
        raise Exception("Event already exists, can't insert")

    result = kocherga.events.google.insert_event({
        "summary": event.title,
        "location": event.location,
        "description": event.description,
        "start": {"dateTime": event.start_dt.strftime(MSK_DATE_FORMAT)},
        "end": {"dateTime": event.end_dt.strftime(MSK_DATE_FORMAT)},
        "attendees": [{"email": email} for email in event.attendees],
    })

    event.google_id = result['id']
    event.google_link = result['htmlLink']
    event.save()
    return event


def delete_event(event_id):
    kocherga.events.google.delete_event(event_id)
    try:
        event = Event.objects.get(pk=event_id)
        event.delete()
    except Event.DoesNotExist:
        pass


class Importer(kocherga.importer.base.IncrementalImporter):

    def get_initial_dt(self):
        return datetime(2015, 8, 1, tzinfo=TZ)

    def do_period_import(self, from_dt: datetime, to_dt: datetime, session) -> datetime:
        google_events = None
        too_old = from_dt < datetime.now(tz=TZ) - timedelta(days=7)
        if too_old:
            logger.info(f"from_dt = {from_dt} is too old, let's reimport everything")
            google_events = kocherga.events.google.list_events(
                to_date=(datetime.now(tz=TZ) + timedelta(days=7 * 8)).date()
            )
        else:
            google_events = kocherga.events.google.list_events(
                to_date=(datetime.now(tz=TZ) + timedelta(days=7 * 8)).date(),
                order_by="updated",
                updated_min=from_dt,
            )

        imported_events = [Event.from_google(ge) for ge in google_events]

        # Old comment:
        # "We can't just Session().merge(...) a google event - it would override local db-only props"
        #
        # I'm not sure whether this still applies after we migrated Flask -> Django. Too lazy to investigate right now.
        for imported_event in imported_events:
            try:
                existing_event = Event.objects.get(pk=imported_event.google_id)
                logger.debug(f'Event {imported_event.google_id}, title {imported_event.title} - existing')
                for prop in ('title', 'description', 'location', 'start_dt', 'end_dt', 'updated_dt'):
                    setattr(existing_event, prop, getattr(imported_event, prop))
            except Event.DoesNotExist:
                logger.debug(f'Event {imported_event.google_id}, title {imported_event.title} - new')
                imported_event.save()

        if too_old:
            return datetime.now(tz=TZ) - timedelta(days=1)

        if len(imported_events):
            return max(e.updated_dt for e in imported_events)
        else:
            return from_dt

    def interval(self):
        return {"minutes": 1}
