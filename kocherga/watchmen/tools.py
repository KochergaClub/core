import logging
logger = logging.getLogger(__name__)

from django.conf import settings

from time import time as clock
from datetime import datetime, timedelta

from typing import List, Dict

import kocherga.importer.base

import kocherga.google
from kocherga.datetime import TZ

from .models import Schedule, ScheduleItem, Shift

import kocherga.importer.base

WATCHMEN_SPREADSHEET_KEY = settings.KOCHERGA_WATCHMEN_SPREADSHEET_KEY

_LAST_UPDATED_WORKSHEET = None
_LAST_UPDATED_SPREADSHEET = None
_CACHED_ROWS: List[List[str]] = []


def fetch_worksheet() -> List[List[str]]:
    global _LAST_UPDATED_WORKSHEET
    global _LAST_UPDATED_SPREADSHEET
    global _CACHED_ROWS

    prev_clock = clock()

    gc = kocherga.google.gspread_client()
    logger.debug("Authorized: ", clock() - prev_clock)
    prev_clock = clock()

    spreadsheet = gc.open_by_key(WATCHMEN_SPREADSHEET_KEY)
    logger.debug("Opened: ", clock() - prev_clock)
    prev_clock = clock()

    # =================== DISABLED - not very reliable =====================
    # if spreadsheet.updated == _LAST_UPDATED_SPREADSHEET:
    #    print('rows from cache! spreadsheet last updated: ' + _LAST_UPDATED_SPREADSHEET)
    #    return _CACHED_ROWS

    worksheet = spreadsheet.worksheet("Смены")
    logger.debug("Worksheet: ", clock() - prev_clock)
    prev_clock = clock()

    if _LAST_UPDATED_SPREADSHEET and worksheet.updated == _LAST_UPDATED_WORKSHEET:
        logger.debug(
            "rows from cache! worksheet last updated: " + str(_LAST_UPDATED_WORKSHEET)
        )
        return _CACHED_ROWS

    rows = worksheet.get_all_values()
    logger.debug("All values: ", clock() - prev_clock)
    prev_clock = clock()

    _CACHED_ROWS = rows
    _LAST_UPDATED_WORKSHEET = worksheet.updated
    _LAST_UPDATED_SPREADSHEET = spreadsheet.updated

    return rows


def load_schedule_from_google(worksheet=None):
    schedule = Schedule()

    rows = fetch_worksheet()

    rows = rows[1:]  # skip header
    rows = [row[:9] for row in rows]  # remove trailing cells with extra data

    FIELD_TIME = 8

    for fields in rows:
        if fields[0]:
            monday = datetime.strptime(fields[0], "%d.%m.%Y").date()
        if not fields[8]:
            continue

        shift = Shift.by_timestring(fields[FIELD_TIME])
        for day_id in range(1, 8):
            # Notice that because of a weird quirk in the google sheet, night shifts are assigned to the previous day.
            # For example, the shift from Friday to Saturday is assigned to Friday, even though the calendar date is Saturday.
            d = monday + timedelta(days=day_id - 1)
            watchman = fields[day_id]

            schedule.add_shift_info(d, shift, watchman)

    return schedule


def load_schedule_from_db():
    schedule = Schedule()

    for item in ScheduleItem.objects.all():
        d = item.date
        shift = item.shift_obj
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
    def do_full_import(self):
        load_schedule_from_google().save_to_db()
