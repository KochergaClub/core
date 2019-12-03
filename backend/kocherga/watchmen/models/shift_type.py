from enum import IntEnum
from datetime import datetime, date, time, timedelta

from django.conf import settings

from kocherga.dateutils import TZ

MODERN_SHIFTS_FIRST_DATE = datetime.strptime(
    settings.KOCHERGA_WATCHMEN_MODERN_SHIFTS_FIRST_DATE, "%Y-%m-%d"
).date()


class ShiftType(IntEnum):
    MORNING_V1 = 1
    EVENING_V1 = 2
    MORNING = 3
    MIDDAY = 4
    EVENING = 5
    NIGHT = 6

    def when(self):
        when_values = {
            ShiftType.MORNING: "утром",
            ShiftType.MIDDAY: "днём",
            ShiftType.EVENING: "вечером",
            ShiftType.NIGHT: "ночью (в конце дня)",
        }
        return when_values[self.value]

    def start_time(self):
        if self.value == ShiftType.MORNING:
            return time(9)
        if self.value == ShiftType.MIDDAY:
            return time(14)
        if self.value == ShiftType.EVENING:
            return time(19)
        if self.value == ShiftType.NIGHT:
            return time(0)

    def end_time(self):
        if self.value == ShiftType.MORNING:
            return time(13, 59, 59, 999999)
        if self.value == ShiftType.MIDDAY:
            return time(18, 59, 59, 999999)
        if self.value == ShiftType.EVENING:
            return time(23, 59, 59, 999999)
        if self.value == ShiftType.NIGHT:
            return time(8, 59, 59, 999999)

    def dt_tuple_by_date(self, d):
        assert isinstance(d, date)

        if self.value == ShiftType.NIGHT:
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

    @classmethod
    def modern_shifts(cls):
        return (cls.MORNING, cls.MIDDAY, cls.EVENING, cls.NIGHT)
