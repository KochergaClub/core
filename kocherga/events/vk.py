import logging
logger = logging.getLogger(__name__)

from django.conf import settings
from django.utils import timezone

from datetime import datetime, timedelta
import json
import urllib

import kocherga.vk.api
from kocherga.vk.helpers import group2id, upload_wall_image
from kocherga.error import PublicError

from kocherga.dateutils import TZ
import kocherga.dateutils

from kocherga.events.announcement import BaseAnnouncement
from kocherga.events.models import Event
import kocherga.events.markup


class VkAnnouncement(BaseAnnouncement):

    def __init__(self, group_name, group_id, post_id):
        self.group_name = group_name
        self.group_id = group_id
        self.post_id = post_id

    @property
    def link(self):
        return "https://vk.com/{}?w=wall-{}_{}".format(
            self.group_name, self.group_id, self.post_id
        )


def vk_description(event):
    return kocherga.events.markup.Markup(event.description or '').as_vk()


def vk_tail(event):
    tail = (
        f"{event.timing_description} в @kocherga_club (антикафе Кочерга). "
        + "Оплата участия — по тарифам антикафе: 2,5 руб./минута."
    )

    timepad_link = event.posted_timepad
    if timepad_link:
        tail += " Регистрация: {}".format(timepad_link)

    return tail


def vk_text(event):
    return vk_description(event) + "\n\n***\n" + vk_tail(event)


def create(event):

    group_name = event.vk_group
    if not group_name:
        raise PublicError("Can't announce - vk_group is not set")

    group_id = group2id(group_name)

    image_file = event.image_file("vk")
    if not image_file:
        raise PublicError("Can't announce - add a vk image first")

    photo_id = upload_wall_image(group_id, open(image_file, 'rb').read())
    message = vk_text(event)

    response = kocherga.vk.api.call(
        "wall.post",
        {
            "owner_id": -group_id,
            "from_group": 1,
            "message": message,
            # "publish_date": int(datetime.now().timestamp()) + 86400,
            "attachments": photo_id,
        },
    )

    kocherga.vk.api.call(
        "groups.edit",
        {
            "group_id": group_id,
            "event_start_date": event.start.timestamp(),
            "event_finish_date": event.end.timestamp(),
        },
    )

    return VkAnnouncement(group_name, group_id, response["post_id"])


def repost_to_daily() -> int:
    events = Event.objects.public_events(date=datetime.today().date())

    DAILY_GROUP_ID = group2id(settings.KOCHERGA_VK['daily_page'])

    operations = []
    for event in events:
        object_id = urllib.parse.parse_qs(urllib.parse.urlparse(event.posted_vk).query)['w']
        operations.append({
            'method': 'wall.repost',
            'params': {
                'group_id': DAILY_GROUP_ID,
                'object': object_id,
            }
        })

    if len(operations) == 0:
        logger.info('Nothing to repost')
    else:
        kocherga.vk.api.bulk_call(operations)
        logger.info(f'Reposted {len(operations)} events')

    return len(operations)


def all_groups():
    logger.info("Selecting all vk groups")
    query = Event.objects.values_list('vk_group').distinct()
    groups = [row[0] for row in query.all()]
    logger.info(f"Got {len(groups)} groups")
    return groups


def update_wiki_schedule(from_dt=None):
    logger.info("Selecting all vk groups")

    if from_dt:
        _from_dt = from_dt
    else:
        # today
        _from_dt = datetime.now(TZ).replace(hour=0, minute=0, second=0, microsecond=0)

    query = (
        Event.objects
        .exclude(deleted=True)
        .filter(
            start__gt=_from_dt,
            start__lt=(datetime.now(TZ) + timedelta(weeks=4)),
        )
        .exclude(posted_vk__isnull=True)
        .exclude(posted_vk='')
    )
    events = query.order_by('start').all()
    logger.info(f"Schedule includes {len(events)} events")

    result = "=== Лента всех мероприятий: [https://vk.com/kocherga_daily] ===\n\n-----\n<br>\n"

    prev_date = None
    for event in events:
        start_local = timezone.localtime(event.start)
        if start_local.date() != prev_date:
            weekdays = [
                "Понедельник",
                "Вторник",
                "Среда",
                "Четверг",
                "Пятница",
                "Суббота",
                "Воскресенье",
            ]
            weekday = weekdays[start_local.weekday()]
            month = kocherga.dateutils.inflected_month(start_local)
            result += f"==={weekday}, {start_local.day} {month}===\n"
            prev_date = event.start.date()

        result += (
            f"<blockquote>'''{start_local:%H:%M}''' [{event.posted_vk}|{event.title}]\n"
        )
        result += f"{event.generate_summary()}</blockquote>\n"

    logger.debug(f"New schedule: {result}")

    group_id = group2id(settings.KOCHERGA_VK["main_page"]["id"])
    page_id = group2id(settings.KOCHERGA_VK["main_page"]["main_wall_page_id"])
    r = kocherga.vk.api.call(
        "pages.get", {"owner_id": -group_id, "page_id": page_id, "need_source": 1}
    )

    position = r["source"].index(
        """</blockquote>\n\n-----\n\n[https://kocherga.timepad.ru/events/past/"""
    )
    position += len("</blockquote>\n")

    content = result + r["source"][position:]
    logger.debug(f"New wiki page content: {content}")

    r = kocherga.vk.api.call(
        "pages.save", {"group_id": group_id, "page_id": page_id, "text": content}
    )

    update_widget()


def update_widget():
    from_dt = datetime.now(TZ).replace(hour=0, minute=0, second=0, microsecond=0)
    query = (
        Event.objects
        .exclude(deleted=True)
        .filter(
            start__gt=from_dt,
            start__lt=(datetime.now(TZ) + timedelta(weeks=4)),
        )
        .filter(event_type='public')
        .exclude(posted_vk__isnull=True)
        .exclude(posted_vk='')
    )
    events = query.order_by('start')[:3].all()

    def event2time(event):
        day_codes = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
        start_local = timezone.localtime(event.start)
        day = day_codes[start_local.weekday()]
        return f"{day} {start_local:%H:%M}"

    group_id = group2id(settings.KOCHERGA_VK["main_page"]["id"])
    page_id = group2id(settings.KOCHERGA_VK["main_page"]["main_wall_page_id"])
    wiki_url = f"https://vk.com/page-{group_id}_{page_id}"

    kocherga.vk.api.call(
        "appWidgets.update",
        {
            "type": "compact_list",
            "code": "return " + json.dumps({
                "title": "Расписание",
                "rows": [
                    {
                        "title": event.title,
                        "title_url": event.posted_vk,
                        "button": "Подробнее",
                        "button_url": event.posted_vk,
                        "time": event2time(event),
                    }
                    for event in events
                ],
                "title_url": wiki_url,
                "more": "Все мероприятия",
                "more_url": wiki_url
            }, ensure_ascii=False) + ";"
        },
        group_token=True
    )
