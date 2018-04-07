import logging
logger = logging.getLogger(__name__)

from datetime import datetime, timedelta

from kocherga.config import TZ

import kocherga.db
from kocherga.db import Session
from kocherga.datetime import MSK_DATE_FORMAT

from kocherga.error import PublicError

import kocherga.events.google
from kocherga.events.event import Event, IMAGE_TYPES
from kocherga.images import image_storage
import kocherga.importer.base

def get_event(event_id):
    event = Session().query(Event).get(event_id)
    if not event:
        raise PublicError(f'Event {event_id} not found')

    return event

def list_events(**kwargs):
    google_events = kocherga.events.google.list_events(**kwargs)

    order_arg = None
    if kwargs.get('order_by', None) == 'updated':
        order_args = Event.updated_ts
    else:
        order_args = Event.start_ts

    events = Session().query(Event).filter(
            Event.google_id.in_(
                tuple(ge['id'] for ge in google_events)
            )
        ).order_by(order_args).all()

    return events

def insert_event(event):
    if event.google_id:
        raise Exception("Event already exists, can't insert")

    result = kocherga.events.google.api().events().insert(
        calendarId=kocherga.events.google.CALENDAR,
        sendNotifications=True,
        body={
            'summary': event.title,
            'location': event.get_room(),
            'description': event.description,
            'start': {
                'dateTime': event.start_dt.strftime(MSK_DATE_FORMAT),
            },
            'end': {
                'dateTime': event.end_dt.strftime(MSK_DATE_FORMAT),
            },
            'attendees': [
                { 'email': email } for email in event.attendees
            ],
            'extendedProperties': {
                'private': event.props
            }
        },
    ).execute()

    event = Event.from_google(result)
    event = Session().merge(event)
    return event


def patch_event(event_id, patch):
    # This method is incomplete for the period of google calendar -> kocherga.db migration.
    # It supports only some fields.
    # Everything else is unused for now anyway.

    event = get_event(event_id)

    google_patch = {}
    for (key, value) in patch.items():
        if key in ('title', 'description', 'summary', 'timepad_category_code', 'timepad_prepaid_tickets'):
            setattr(event, key, value)
        else:
            raise Exception('Key {} is not allowed in patch yet'.format(key))

    event.patch_google()
    return event

def delete_event(event_id):
    kocherga.events.google.delete_event(event_id)
    event = Session().query(Event).get(event_id)
    if event:
        Session().delete(event) # TODO - set deleted bit instead?

class Importer(kocherga.importer.base.IncrementalImporter):
    def get_initial_dt(self):
        return datetime(2015,8,1,tzinfo=TZ)

    def init_db(self):
        Event.__table__.create(bind=kocherga.db.engine())

    def do_period_import(self, from_dt: datetime, to_dt: datetime, session) -> datetime:
        google_events = None
        too_old = from_dt < datetime.now(tz=TZ) - timedelta(days=7)
        if too_old:
            logger.info(f"from_dt = {from_dt} is too old, let's reimport everything")
            google_events = kocherga.events.google.list_events(
                to_date=(datetime.now(tz=TZ) + timedelta(days=7*8)).date(),
            )
        else:
            google_events = kocherga.events.google.list_events(
                to_date=(datetime.now(tz=TZ) + timedelta(days=7*8)).date(),
                order_by='updated',
                updated_min=from_dt,
            )

        events = [Event.from_google(e) for e in google_events]
        # Note that merge doesn't rewrite the local-db-only fields such as event.summary (I checked).
        events = [Session().merge(event) for event in events]

        if too_old:
            return datetime.now(tz=TZ) - timedelta(days=1)
        else:
            return max(e.updated_dt for e in events)
