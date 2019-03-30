import logging
logger = logging.getLogger(__name__)

from typing import Dict
from datetime import datetime, date, timedelta

from kocherga.dateutils import TZ
from .models import Shift, ShiftType


def shifts_by_date(d: date) -> Dict[ShiftType, Shift]:
    query = Shift.objects.filter(date=d)

    day_schedule = {}
    for shift in query:
        day_schedule[shift.shift_obj] = shift

    for shift_type in ShiftType.modern_shifts():
        if shift_type not in day_schedule:
            day_schedule[shift_type] = Shift(date=d, shift=shift_type.name)

    return day_schedule


def shift_by_dt(dt: datetime) -> Shift:
    shift_type = ShiftType.by_dt(dt)

    d = dt.date()
    if shift_type == ShiftType.NIGHT:
        # Night shifts are assigned to the previous day.
        d -= timedelta(days=1)

    return Shift.objects.get(date=d, shift=shift_type.name)


def current_shift() -> Shift:
    return shift_by_dt(datetime.now(TZ))


# Find the last active watchman. The current one or the one before if there's nobody right now
# (because it's night, probably).
def last_watchman():
    dt = datetime.now(TZ)
    for i in range(48):
        shift = shift_by_dt(dt - timedelta(hours=i))
        if shift.watchman:
            return shift.watchman

    raise Exception("Couldn't find a watchman in the last 48 hours.")


# Find the nearest active watchman. The current one or the one after if there's nobody right now
# (because it's night, probably).
def nearest_watchman():
    dt = datetime.now(TZ)
    for i in range(48):
        shift = shift_by_dt(dt + timedelta(hours=i))
        if shift.watchman:
            return shift.watchman

    raise Exception("Couldn't find a watchman in the next 48 hours.")
