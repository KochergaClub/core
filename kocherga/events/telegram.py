import logging

logger = logging.getLogger(__name__)

from datetime import datetime, timedelta

import kocherga.dateutils

from kocherga.telegram import post_to_channel

from kocherga.events.models import Event


def schedule_message():
    message = "#расписание_кочерги\nНа этой неделе в Кочерге:"

    message += "\n\n"

    dt = datetime.today()
    if dt.weekday() < 2:
        dt = dt - timedelta(days=dt.weekday())
    else:
        dt = dt + timedelta(days=7 - dt.weekday())

    dt = dt.replace(hour=0, minute=0, second=0, microsecond=0)

    query = (
        Event.objects
        .filter(deleted=False)
        .filter(start__gt = dt)
        .filter(start__lt = (dt + timedelta(weeks=1)))
        .exclude(posted_vk__isnull = True)
        .exclude(posted_vk = '')
    )

    events = query.order_by('start').all()
    logger.info(f"Schedule includes {len(events)} events")

    prev_date = None
    for event in events:
        if event.start.date() != prev_date:
            weekday = kocherga.dateutils.weekday(event.start).upper()
            month = kocherga.dateutils.inflected_month(event.start)
            message += f"{weekday}, {event.start.day} {month}\n"
            prev_date = event.start.date()

        title = event.title
        if event.posted_vk:
            title = f'<a href="{event.posted_vk}">{title}</a>'
        message += f"{event.start:%H:%M} {title}\n"
        message += f"{event.generate_summary()}\n\n"

    return message


def post_schedule():
    message = schedule_message()
    post_to_channel(message)
