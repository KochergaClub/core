import logging
logger = logging.getLogger(__name__)

import datetime

from typing import Any, Dict, List

import kocherga.google


def api():
    return kocherga.google.service("calendar")


def events_with_condition(calendar_id, **kwargs) -> List[Dict[str, Any]]:
    kw = {
        "calendarId": calendar_id,
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
                calendar_id,
                **{**kwargs, **{"pageToken": eventsResult["nextPageToken"]}}
            )
        )

    return events


def list_events(
    calendar_id: str,
    from_date: datetime.date = None,
    to_date: datetime.date = None,
    order_by=None,
    updated_min=None,
    deleted=False,
) -> List[Dict[str, Any]]:
    kwargs = {}

    if from_date:
        kwargs["timeMin"] = (
            datetime.datetime.combine(from_date, datetime.time.min).isoformat() + "Z"
        )
    if to_date:
        kwargs["timeMax"] = (
            datetime.datetime.combine(to_date, datetime.time.max).isoformat() + "Z"
        )

    if order_by:
        kwargs["orderBy"] = order_by

    if updated_min:
        kwargs["updatedMin"] = updated_min.isoformat()

    if deleted:
        kwargs["showDeleted"] = True

    return events_with_condition(**kwargs)
