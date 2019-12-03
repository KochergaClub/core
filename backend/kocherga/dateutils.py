from datetime import timedelta
from django.utils import timezone

from dateutil import tz

# TODO - move to django.utils.timezone
TZ = tz.tzoffset("MSK", 3600 * 3)


def dts(dt):
    return dt.astimezone(TZ).replace(microsecond=0).isoformat('T')


def date_chunks(from_dt, to_dt, step=timedelta(days=28)):
    chunk_from_dt = from_dt

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


def humanize_date(dt):
    dt = timezone.localtime(dt)
    if dt.date() == timezone.now().date():
        return 'сегодня'
    elif dt.date() == timezone.now().date() - timedelta(days=1):
        return 'вчера'
    elif dt.date() == timezone.now().date() + timedelta(days=1):
        return 'завтра'
    return dt.strftime('%Y-%m-%d')
