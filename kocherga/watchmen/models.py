import logging
logger = logging.getLogger(__name__)

from datetime import datetime, date, time, timedelta
from enum import IntEnum

from typing import Dict

from django.conf import settings
from django.db import models

from kocherga.dateutils import TZ
import kocherga.staff.models

MODERN_SHIFTS_FIRST_DATE = datetime.strptime(
    settings.KOCHERGA_WATCHMEN_MODERN_SHIFTS_FIRST_DATE, "%Y-%m-%d"
).date()


class Shift(IntEnum):
    MORNING_V1 = 1
    EVENING_V1 = 2
    MORNING = 3
    MIDDAY = 4
    EVENING = 5
    NIGHT = 6

    def when(self):
        when_values = {
            Shift.MORNING: "утром",
            Shift.MIDDAY: "днём",
            Shift.EVENING: "вечером",
            Shift.NIGHT: "ночью (в конце дня)",
        }
        return when_values[self.value]

    def start_time(self):
        if self.value == Shift.MORNING:
            return time(9)
        if self.value == Shift.MIDDAY:
            return time(14)
        if self.value == Shift.EVENING:
            return time(19)
        if self.value == Shift.NIGHT:
            return time(0)

    def end_time(self):
        if self.value == Shift.MORNING:
            return time(13, 59, 59, 999999)
        if self.value == Shift.MIDDAY:
            return time(18, 59, 59, 999999)
        if self.value == Shift.EVENING:
            return time(23, 59, 59, 999999)
        if self.value == Shift.NIGHT:
            return time(8, 59, 59, 999999)

    def dt_tuple_by_date(self, d):
        assert isinstance(d, date)

        if self.value == Shift.NIGHT:
            d += timedelta(days=1)
        return (
            datetime.combine(d, self.start_time(), tzinfo=TZ),
            datetime.combine(d, self.end_time(), tzinfo=TZ),
        )

    @classmethod
    def by_dt(cls, dt):
        assert isinstance(dt, datetime)

        t = dt.time()

        if dt.date() < MODERN_SHIFTS_FIRST_DATE:
            if time(11, 0) <= t < time(17, 30):
                return cls.MORNING_V1
            if time(17, 30) <= t <= time.max:
                return cls.EVENING_V1
            raise Exception("Invalid time {}".format(t))

        if 0 <= t.hour < 9:
            return cls.NIGHT
        if 9 <= t.hour < 14:
            return cls.MORNING
        if 14 <= t.hour < 19:
            return cls.MIDDAY
        if 19 <= t.hour:
            return cls.EVENING

        raise Exception("Invalid time {}".format(t))

    @classmethod
    def by_timestring(cls, timestring):
        time2shift = {
            "11:00-17:30": cls.MORNING_V1,
            "17:30-00:00": cls.EVENING_V1,
            "09:00-14:00": cls.MORNING,
            "14:00-19:00": cls.MIDDAY,
            "19:00-00:00": cls.EVENING,
            "Ночь": cls.NIGHT,
        }
        return time2shift[timestring]


class ScheduleItem(models.Model):
    date = models.DateField()
    shift = models.CharField(
        max_length=20,
        choices=[
            (shift.name, shift.name) for shift in Shift
        ],
    )
    watchman = models.CharField(max_length=100, db_index=True)

    def color(self):
        member = kocherga.staff.models.Member.objects.get(short_name=self.watchman)
        return member.color

    @property
    def shift_obj(self):
        return Shift[self.shift]

    class Meta:
        db_table = "watchmen_schedule"
        unique_together = (
            ('date', 'shift'),
        )


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
            d = d - timedelta(
                days=1
            )  # See the comment about google sheets quirk below.

        shift_info = self.shifts_by_date(d)
        return shift_info[shift]

    def save_to_db(self):
        ScheduleItem.objects.all().delete()
        for (d, shift_info) in self._data.items():
            for (shift, watchman) in shift_info.items():
                ScheduleItem.objects.create(date=d, shift=shift.name, watchman=watchman)

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
