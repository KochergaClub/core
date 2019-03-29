import logging
logger = logging.getLogger(__name__)

from .models import Schedule, ScheduleItem


def load_schedule():
    schedule = Schedule()

    for item in ScheduleItem.objects.all():
        d = item.date
        shift = item.shift_obj
        watchman = item.watchman
        schedule.add_shift_info(d, shift, watchman)

    return schedule


def current_watchman():
    return load_schedule().current_watchman()


def last_watchman():
    return load_schedule().last_watchman()


def nearest_watchman():
    return load_schedule().nearest_watchman()
