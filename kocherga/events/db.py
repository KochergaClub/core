import logging
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
    google_event = kocherga.events.google.get_event(event_id)
    event = Event.from_google(google_event)
    event = Session().merge(event)

    return event

def list_events(**kwargs):
    google_events = kocherga.events.google.list_events(**kwargs)
    events = [Event.from_google(e) for e in google_events]

    # Note that merge doesn't rewrite the local-db-only fields such as event.summary (I checked).
    events = [Session().merge(event) for event in events]

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
    # It supports only patching 'title' and 'description'.
    # Everything else is unused for now anyway.

    event = get_event(event_id)

    google_patch = {}
    for (key, value) in patch.items():
        if key == 'title':
            event.title = value
        elif key == 'description':
            event.description = value
        else:
            raise Exception('Key {} is not allowed in patch yet'.format(key))

    event.patch_google()
    event = Session().merge(event)
    return event

def delete_event(event_id):
    kocherga.events.google.delete_event(event_id)
    event = Session().query(Event).get(event_id)
    if event:
        Session().delete(event) # TODO - set deleted bit instead?

# Deprecated, use event.set_prop instead
# (Still used in Ludwig)
def set_event_property(event_id, key, value):
    # Planned future changes: save some or all properties in a local sqlite DB instead.
    # Google sets 1k limit for property values, it won't be enough for longer descriptions (draft, minor changes for timepad, etc).
    event = get_event(event_id)
    event.set_prop(key, value) # saves both to google and to local DB

class Importer(kocherga.importer.base.IncrementalImporter):
    def get_initial_dt(self):
        return datetime(2015,8,1,tzinfo=TZ)

    def init_db(self):
        Event.__table__.create(bind=kocherga.db.engine())

    def do_period_import(self, from_dt: datetime, to_dt: datetime, session) -> datetime:
        if from_dt < datetime.now(tz=TZ) - timedelta(days=7):
            logging.info(f"from_dt = {from_dt} is too old, let's reimport everything")
            events = list_events(
                to_date=(datetime.now(tz=TZ) + timedelta(days=7*8)).date(),
            )
            # we don't need to do anything else - list_events updates the local db every time

            return datetime.now(tz=TZ) - timedelta(days=1)

        events = list_events(
            to_date=(datetime.now(tz=TZ) + timedelta(days=7*8)).date(),
            order_by='updated',
            updated_min=from_dt,
        )
        return max(e.updated_dt for e in events)
