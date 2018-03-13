import shutil
import kocherga.events.google
from kocherga.events.event import Event, IMAGE_TYPES
from kocherga.images import image_storage

from kocherga.error import PublicError

def get_event(event_id):
    google_event = kocherga.events.google.get_event(event_id)
    return Event.from_google(google_event)

def list_events(limit=100, date=None, from_date=None, to_date=None, q=None):
    google_events = kocherga.events.google.list_events(date=date, from_date=from_date, to_date=to_date, q=q)
    events = [Event.from_google(e) for e in google_events]
    return events

def insert_event(event):
    if event.google_id:
        raise Exception("Event already exists, can't insert")

    MSK_DATE_FORMAT = '%Y-%m-%dT%H:%M:%S+03:00' # copy-pasted from kocherga.events.booking, FIXME

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

    return Event.from_google(result)

def patch_event(event_id, patch):
    google_patch = {}
    for (key, value) in patch.items():
        if key == 'title':
            google_patch['summary'] = value
        elif key == 'description':
            google_patch['description'] = value
        elif key == 'room':
            google_patch['location'] = value
        else:
            raise Exception('Key {} is not allowed in patch yet'.format(key))

    google_event = kocherga.events.google.patch_event(event_id, google_patch)
    return Event.from_google(google_event)

def delete_event(event_id):
    kocherga.events.google.delete_event(event_id)

# Deprecated, use event.set_prop instead
def set_event_property(event_id, key, value):
    # Planned future changes: save some or all properties in a local sqlite DB instead.
    # Google sets 1k limit for property values, it won't be enough for longer descriptions (draft, minor changes for timepad, etc).
    kocherga.events.google.set_property(event_id, key, value)
