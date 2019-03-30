import logging
logger = logging.getLogger(__name__)

from .models import Schedule, ScheduleItem


def load_schedule():
    schedule = Schedule()

    for item in ScheduleItem.objects.all():
        d = item.date
        shift = item.shift_obj
        watchman = item.watchman_name
        schedule.add_shift_info(d, shift, watchman)

    return schedule
