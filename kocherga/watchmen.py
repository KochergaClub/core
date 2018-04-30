import logging
logger = logging.getLogger(__name__)

from time import time as clock
from datetime import datetime, date, time, timedelta
from enum import IntEnum

import sqlalchemy.sql

from typing import List, Dict

import kocherga.google
import kocherga.db
import kocherga.config
from kocherga.config import TZ
import kocherga.importer.base

from sqlalchemy import Column, Date, String, Enum

MODERN_SHIFTS_FIRST_DATE = datetime.strptime(kocherga.config.config()['modern_shifts_first_date'], '%Y-%m-%d').date()
WATCHMEN_SPREADSHEET_KEY = kocherga.config.config()['watchmen_spreadsheet_key']

class Shift(IntEnum):
    MORNING_V1 = 1
    EVENING_V1 = 2
    MORNING = 3
    MIDDAY = 4
    EVENING = 5
    NIGHT = 6

    def when(self):
        when_values = {
            Shift.MORNING: 'утром',
            Shift.MIDDAY: 'днём',
            Shift.EVENING: 'вечером',
            Shift.NIGHT: 'ночью (в конце дня)',
        }
        return when_values[self.value]

    def start_time(self):
        if self.value == Shift.MORNING: return time(9)
        if self.value == Shift.MIDDAY: return time(14)
        if self.value == Shift.EVENING: return time(19)
        if self.value == Shift.NIGHT: return time(0)

    def end_time(self):
        if self.value == Shift.MORNING: return time(13, 59, 59, 999999)
        if self.value == Shift.MIDDAY: return time(18, 59, 59, 999999)
        if self.value == Shift.EVENING: return time(23, 59, 59, 999999)
        if self.value == Shift.NIGHT: return time(8, 59, 59, 999999)

    def dt_tuple_by_date(self, d):
        assert isinstance(d, date)

        if self.value == Shift.NIGHT:
            d += timedelta(days=1)
        return (
            datetime.combine(d, self.start_time()),
            datetime.combine(d, self.end_time()),
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
            raise Exception('Invalid time {}'.format(t))

        if 0 <= t.hour < 9:
            return cls.NIGHT
        if 9 <= t.hour < 14:
            return cls.MORNING
        if 14 <= t.hour < 19:
            return cls.MIDDAY
        if 19 <= t.hour:
            return cls.EVENING

        raise Exception('Invalid time {}'.format(t))

    @classmethod
    def by_timestring(cls, timestring):
        time2shift = {
            '11:00-17:30': cls.MORNING_V1,
            '17:30-00:00': cls.EVENING_V1,
            '09:00-14:00': cls.MORNING,
            '14:00-19:00': cls.MIDDAY,
            '19:00-00:00': cls.EVENING,
            'Ночь': cls.NIGHT,
        }
        return time2shift[timestring]

class ScheduleItem(kocherga.db.Base):
    __tablename__ = 'watchmen_schedule'
    date = Column(Date, primary_key=True)
    shift = Column(Enum(Shift), primary_key=True)
    watchman = Column(String(100), index=True)


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
            raise Exception('Shift by date {} is not found'.format(d))
        return shift_info

    def watchman_by_dt(self, dt: datetime) -> str:
        shift = Shift.by_dt(dt)

        d = dt.date()
        if shift == Shift.NIGHT:
            d = d - timedelta(days=1) # See the comment about google sheets quirk below.

        shift_info = self.shifts_by_date(d)
        return shift_info[shift]

    def save_to_db(self, session):
        session.query(ScheduleItem).delete()
        for (d, shift_info) in self._data.items():
            for (shift, watchman) in shift_info.items():
                session.add(
                    ScheduleItem(
                        date=d,
                        shift=shift,
                        watchman=watchman,
                    )
                )

    def current_watchman(self):
        return self.watchman_by_dt(datetime.today())

    # Find the last active watchman. The current one or the one before if there's nobody right now (because it's night, probably).
    def last_watchman(self):
        dt = datetime.today()
        for i in range(48):
            watchman = self.watchman_by_dt(dt - timedelta(hours=i))
            if watchman and watchman != 'Ночь':
                return watchman

        raise Exception("Couldn't find a watchman in the last 48 hours.")

    # Find the nearest active watchman. The current one or the one after if there's nobody right now (because it's night, probably).
    def nearest_watchman(self):
        dt = datetime.today()
        for i in range(48):
            watchman = self.watchman_by_dt(dt + timedelta(hours=i))
            if watchman and watchman != 'Ночь':
                return watchman

        raise Exception("Couldn't find a watchman in the next 48 hours.")

_LAST_UPDATED_WORKSHEET = None
_LAST_UPDATED_SPREADSHEET = None
_CACHED_ROWS: List[List[str]] = []
def fetch_worksheet() -> List[List[str]]:
    global _LAST_UPDATED_WORKSHEET
    global _LAST_UPDATED_SPREADSHEET
    global _CACHED_ROWS

    prev_clock = clock()

    gc = kocherga.google.gspread_client()
    logger.debug('Authorized: ', clock() - prev_clock); prev_clock = clock()

    spreadsheet = gc.open_by_key(WATCHMEN_SPREADSHEET_KEY)
    logger.debug('Opened: ', clock() - prev_clock); prev_clock = clock()

    # =================== DISABLED - not very reliable =====================
    #if spreadsheet.updated == _LAST_UPDATED_SPREADSHEET:
    #    print('rows from cache! spreadsheet last updated: ' + _LAST_UPDATED_SPREADSHEET)
    #    return _CACHED_ROWS

    worksheet = spreadsheet.worksheet('Смены')
    logger.debug('Worksheet: ', clock() - prev_clock); prev_clock = clock()

    if _LAST_UPDATED_SPREADSHEET and worksheet.updated == _LAST_UPDATED_WORKSHEET:
        logger.debug('rows from cache! worksheet last updated: ' + str(_LAST_UPDATED_WORKSHEET))
        return _CACHED_ROWS

    rows = worksheet.get_all_values()
    logger.debug('All values: ', clock() - prev_clock); prev_clock = clock()

    _CACHED_ROWS = rows
    _LAST_UPDATED_WORKSHEET = worksheet.updated
    _LAST_UPDATED_SPREADSHEET = spreadsheet.updated

    return rows

def load_schedule_from_google(worksheet=None):
    schedule = Schedule()

    rows = fetch_worksheet()

    rows = rows[1:] # skip header
    rows = [row[:9] for row in rows] # remove trailing cells with extra data

    FIELD_TIME = 8

    for fields in rows:
        if fields[0]:
            monday = datetime.strptime(fields[0], '%d.%m.%Y').date()
        if not fields[8]:
            continue

        shift = Shift.by_timestring(fields[FIELD_TIME])
        for day_id in range(1,8):
            # Notice that because of a weird quirk in the google sheet, night shifts are assigned to the previous day.
            # For example, the shift from Friday to Saturday is assigned to Friday, even though the calendar date is Saturday.
            d = monday + timedelta(days=day_id-1)
            watchman = fields[day_id]

            schedule.add_shift_info(d, shift, watchman)

    return schedule

def load_schedule_from_db():
    schedule = Schedule()

    session = kocherga.db.Session()

    for item in session.query(ScheduleItem).all():
        d = item.date
        shift = item.shift
        watchman = item.watchman
        schedule.add_shift_info(d, shift, watchman)

    return schedule

# for the code which doesn't care about a source - to make a migration to the local DB easier
def load_schedule():
    last_dt = Importer().last_dt
    if not last_dt or last_dt < datetime.now(TZ) - timedelta(minutes=30):
        return load_schedule_from_google()
    return load_schedule_from_db()

def current_watchman():
    return load_schedule().current_watchman()

def last_watchman():
    return load_schedule().last_watchman()

def nearest_watchman():
    return load_schedule().nearest_watchman()


class Importer(kocherga.importer.base.FullImporter):
    def init_db(self):
        pass

    def do_full_import(self, session):
        load_schedule_from_google().save_to_db(session)
