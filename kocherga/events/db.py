from kocherga.dateutils import dts

import kocherga.events.google
from .models import Event


def insert_event(event):
    if event.google_id:
        raise Exception("Event already exists, can't insert")

    result = kocherga.events.google.insert_event({
        "summary": event.title,
        "location": event.location,
        "description": event.description,
        "start": {"dateTime": dts(event.start)},
        "end": {"dateTime": dts(event.end)},
        "attendees": [{"email": email} for email in event.attendees],
    })

    event.google_id = result['id']
    event.google_link = result['htmlLink']
    event.save()
    return event


def delete_event(google_id):
    kocherga.events.google.delete_event(google_id)
    try:
        event = Event.objects.get(google_id=google_id)
        event.delete()
    except Event.DoesNotExist:
        pass
