import logging
logger = logging.getLogger(__name__)

from typing import Dict
from datetime import datetime, date, timedelta

from kocherga.dateutils import TZ
from .models import Shift, ShiftType


def shifts_by_date(d: date) -> Dict[ShiftType, str]:
    query = Shift.objects.filter(date=d)
    if not len(query):
        raise Exception(f"Shifts by date {d} not found")

    day_schedule = {}
    for shift in query:
        day_schedule[shift.shift_obj] = shift.watchman_name

    return day_schedule


def watchman_by_dt(dt: datetime) -> str:
    shift = ShiftType.by_dt(dt)

    d = dt.date()
    if shift == ShiftType.NIGHT:
        # Night shifts are assigned to the previous day.
        d -= timedelta(days=1)

    shift_info = shifts_by_date(d)
    return shift_info[shift]


def current_watchman():
    return watchman_by_dt(datetime.now(TZ))


# Find the last active watchman. The current one or the one before if there's nobody right now
# (because it's night, probably).
def last_watchman():
    dt = datetime.now(TZ)
    for i in range(48):
        watchman = watchman_by_dt(dt - timedelta(hours=i))
        if watchman and watchman != "Ночь":
            return watchman

    raise Exception("Couldn't find a watchman in the last 48 hours.")


# Find the nearest active watchman. The current one or the one after if there's nobody right now
# (because it's night, probably).
def nearest_watchman():
    dt = datetime.now(TZ)
    for i in range(48):
        watchman = watchman_by_dt(dt + timedelta(hours=i))
        if watchman and watchman != "Ночь":
            return watchman

    raise Exception("Couldn't find a watchman in the next 48 hours.")
