import datetime
import logging

from typing import Any, Dict, List

import kocherga.google
import kocherga.events.timepad

import kocherga.config

CALENDAR = kocherga.config.google_calendar_id()

def api():
    return kocherga.google.service('calendar')

def get_event(event_id):
    return api().events().get(calendarId=CALENDAR, eventId=event_id).execute()

def delete_event(event_id):
    return api().events().delete(calendarId=CALENDAR, eventId=event_id).execute()

def patch_event(event_id, patch):
    return api().events().patch(calendarId=CALENDAR, eventId=event_id, body=patch).execute()

def set_property(event_id, key, value):
    return patch_event(event_id, {
        "extendedProperties": {
            "private": {
                key: value
            }
        }
    })

def events_with_condition(**kwargs) -> List[Dict[str, Any]]:
    kw = {
        'calendarId': CALENDAR,
        'maxResults': 100,
        'singleEvents': True,
        'orderBy': 'startTime',
    }
    kw.update(kwargs)

    logging.info('Requesting a list of events')

    eventsResult = api().events().list(**kw).execute()
    events = eventsResult.get('items', [])

    events = [e for e in events
              if 'dateTime' in e['start']]  # filter out all-day events

    if 'nextPageToken' in eventsResult:
        logging.info('Asking for the next page')
        events.extend(
            events_with_condition(
                **{
                    **kwargs,
                    **{
                        'pageToken': eventsResult['nextPageToken']
                    }
                }
            )
        )

    return events

def list_events(
        date: datetime.date = None,
        from_date: datetime.date = None,
        to_date: datetime.date = None,
        q = None
) -> List[Dict[str, Any]]:
    if date and from_date or date and to_date:
        raise Exception('No more than 1 of `date` and `from_date`/`to_date` should be set')

    timeMin = None
    timeMax = None

    if date:
        timeMin = datetime.datetime.combine(date, datetime.time()).isoformat() + 'Z'
        timeMax = datetime.datetime.combine(date + datetime.timedelta(days=1), datetime.time()).isoformat() + 'Z'

    if from_date:
        timeMin = datetime.datetime.combine(from_date, datetime.time()).isoformat() + 'Z'
        timeMax = datetime.datetime.combine(to_date, datetime.time()).isoformat() + 'Z'

    return events_with_condition(
        timeMin=timeMin,
        timeMax=timeMax,
        q=q,
    )
