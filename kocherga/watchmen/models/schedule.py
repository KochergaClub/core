import logging
logger = logging.getLogger(__name__)

from typing import Dict
from datetime import datetime, date, timedelta

from kocherga.dateutils import TZ

from .shift import Shift


class Schedule:
    def __init__(self):
        self._data: Dict[date, Dict[Shift, str]] = {}

    def add_shift_info(self, d: date, shift: Shift, watchman: str) -> None:
        if d not in self._data:
            self._data[d] = {}

        self._data[d][shift] = watchman

    def shifts_by_date(self, d):
        shift_info = self._data.get(d, None)
        if not shift_info:
            raise Exception("Shift by date {} is not found".format(d))
        return shift_info

    def watchman_by_dt(self, dt: datetime) -> str:
        shift = Shift.by_dt(dt)

        d = dt.date()
        if shift == Shift.NIGHT:
            # Night shifts are assigned to the previous day.
            d -= timedelta(days=1)

        shift_info = self.shifts_by_date(d)
        return shift_info[shift]

    def current_watchman(self):
        return self.watchman_by_dt(datetime.now(TZ))

    # Find the last active watchman. The current one or the one before if there's nobody right now
    # (because it's night, probably).
    def last_watchman(self):
        dt = datetime.now(TZ)
        for i in range(48):
            watchman = self.watchman_by_dt(dt - timedelta(hours=i))
            if watchman and watchman != "Ночь":
                return watchman

        raise Exception("Couldn't find a watchman in the last 48 hours.")

    # Find the nearest active watchman. The current one or the one after if there's nobody right now
    # (because it's night, probably).
    def nearest_watchman(self):
        dt = datetime.now(TZ)
        for i in range(48):
            watchman = self.watchman_by_dt(dt + timedelta(hours=i))
            if watchman and watchman != "Ночь":
                return watchman

        raise Exception("Couldn't find a watchman in the next 48 hours.")
