import logging
logger = logging.getLogger(__name__)

from django.conf import settings

import datetime

from typing import Any, Dict, List

import kocherga.google


def get_calendar_id():
    return settings.KOCHERGA_GOOGLE_CALENDAR_ID


def api():
    return kocherga.google.service("calendar")


def get_event(event_id):
    return api().events().get(calendarId=get_calendar_id(), eventId=event_id).execute()


def delete_event(event_id):
    return api().events().delete(calendarId=get_calendar_id(), eventId=event_id).execute()


def insert_event(params):
    return api().events().insert(
        calendarId=get_calendar_id(),
        sendNotifications=True,
        body=params
    ).execute()


def patch_event(event_id, patch):
    logger.info(f"Patching {event_id} with {str(patch)}")
    return (
        api()
        .events()
        .patch(calendarId=get_calendar_id(), eventId=event_id, body=patch)
        .execute()
    )


def events_with_condition(**kwargs) -> List[Dict[str, Any]]:
    kw = {
        "calendarId": get_calendar_id(),
        "maxResults": 1000,
        "singleEvents": True,
        "orderBy": "startTime",
    }
    kw.update(kwargs)

    logger.info("Requesting a list of events")

    eventsResult = api().events().list(**kw).execute()
    events = eventsResult.get("items", [])

    # filter out cancelled and all-day events
    events = [e for e in events if "start" in e and "dateTime" in e["start"]]

    if "nextPageToken" in eventsResult:
        logger.info(
            "Asking for the next page, last date is {}".format(
                events[-1]["start"]["dateTime"]
            )
        )
        events.extend(
            events_with_condition(
                **{**kwargs, **{"pageToken": eventsResult["nextPageToken"]}}
            )
        )

    return events


def list_events(
    date: datetime.date = None,
    from_date: datetime.date = None,
    to_date: datetime.date = None,
    q=None,
    order_by=None,
    updated_min=None,
    deleted=False,
) -> List[Dict[str, Any]]:
    if date and from_date or date and to_date:
        raise Exception(
            "No more than 1 of `date` and `from_date`/`to_date` should be set"
        )

    kwargs = {}

    if date:
        from_date = to_date = date

    if from_date:
        kwargs["timeMin"] = (
            datetime.datetime.combine(from_date, datetime.time.min).isoformat() + "Z"
        )
    if to_date:
        kwargs["timeMax"] = (
            datetime.datetime.combine(to_date, datetime.time.max).isoformat() + "Z"
        )

    if q:
        kwargs["q"] = q

    if order_by:
        kwargs["orderBy"] = order_by

    if updated_min:
        kwargs["updatedMin"] = updated_min.isoformat()

    if deleted:
        kwargs["showDeleted"] = True

    return events_with_condition(**kwargs)
