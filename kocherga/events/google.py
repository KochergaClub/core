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
    logging.info(f'Patching {event_id} with {str(patch)}')
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
        'maxResults': 1000,
        'singleEvents': True,
        'orderBy': 'startTime',
    }
    kw.update(kwargs)

    logging.info('Requesting a list of events')

    eventsResult = api().events().list(**kw).execute()
    events = eventsResult.get('items', [])

    # filter out cancelled and all-day events
    events = [
        e for e in events
        if 'start' in e and 'dateTime' in e['start']
    ]

    if 'nextPageToken' in eventsResult:
        logging.info('Asking for the next page, last date is {}'.format(events[-1]['start']['dateTime']))
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
        q = None,
        order_by = None,
        updated_min = None,
) -> List[Dict[str, Any]]:
    if date and from_date or date and to_date:
        raise Exception('No more than 1 of `date` and `from_date`/`to_date` should be set')

    timeMin = None
    timeMax = None

    kwargs = {}

    if date:
        kwargs['timeMin'] = datetime.datetime.combine(date, datetime.time()).isoformat() + 'Z'
        kwargs['timeMax'] = datetime.datetime.combine(date + datetime.timedelta(days=1), datetime.time()).isoformat() + 'Z'

    if from_date:
        kwargs['timeMin'] = datetime.datetime.combine(from_date, datetime.time()).isoformat() + 'Z'
    if to_date:
        kwargs['timeMax'] = datetime.datetime.combine(to_date, datetime.time()).isoformat() + 'Z'

    if q:
        kwargs['q'] = q

    if order_by:
        kwargs['orderBy'] = order_by

    if updated_min:
        kwargs['updatedMin'] = updated_min.isoformat()

    return events_with_condition(**kwargs)
