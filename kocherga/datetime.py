from datetime import timedelta

### pytz is kinda crazy - it returns LMT from time to time.
### It can be fixed by using tz.localize(dt) instead of passing tzinfo, and it looks more correct, but it requires a big refactoring.
###
### Also: "The preferred way of dealing with times is to always work in UTC, converting to localtime only when generating output to be read by humans."
### (from https://pypi.python.org/pypi/pytz/)
###
# import pytz
# TZ = pytz.timezone('Europe/Moscow')

from dateutil import tz

# TODO - move to django.utils.timezone
TZ = tz.tzoffset("MSK", 3600 * 3)

# TODO - base this on TZ
MSK_DATE_FORMAT = "%Y-%m-%dT%H:%M:%S+03:00"


def dts(dt):
    return dt.strftime(MSK_DATE_FORMAT)


def date_chunks(from_dt, to_dt, step=timedelta(days=28)):
    chunk_from_dt = from_dt
    chunk_to_dt = from_dt + step

    while chunk_from_dt < to_dt:
        yield (chunk_from_dt, min(chunk_from_dt + step, to_dt))
        chunk_from_dt += step


def inflected_weekday(dt):
    return [
        "понедельник",
        "вторник",
        "среду",
        "четверг",
        "пятницу",
        "субботу",
        "воскресенье",
    ][dt.weekday()]


WEEKDAY_NAMES = [
    "понедельник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота",
    "воскресенье",
]

def weekday(dt):
    return WEEKDAY_NAMES[dt.weekday()]


def inflected_month(dt):
    return [
        "января",
        "февраля",
        "марта",
        "апреля",
        "мая",
        "июня",
        "июля",
        "августа",
        "сентября",
        "октября",
        "ноября",
        "декабря",
    ][dt.month - 1]
