import logging
logger = logging.getLogger(__name__)

from datetime import datetime, timedelta
import requests
import json

from kocherga.config import TZ
from kocherga.db import Session
import kocherga.vk.api
from kocherga.vk.helpers import group2id, upload_wall_image
from kocherga.error import PublicError
import kocherga.datetime

from kocherga.events.announcement import BaseAnnouncement
from kocherga.events.event import Event
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
        f"{event.timing_description} в @kocherga_club (антикафе Кочерга). Оплата участия — по тарифам антикафе: 2,5 руб./минута."
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
            "publish_date": int(datetime.now().timestamp()) + 86400,
            "attachments": photo_id,
        },
    )

    kocherga.vk.api.call(
        "groups.edit",
        {
            "group_id": group_id,
            "event_start_date": event.start_dt.timestamp(),
            "event_finish_date": event.end_dt.timestamp(),
        },
    )

    return VkAnnouncement(group_name, group_id, response["post_id"])


def all_groups():
    logger.info("Selecting all vk groups")
    query = Session().query(Event.vk_group.distinct().label("vk_group"))
    groups = [row.vk_group for row in query.all()]
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
        Session()
        .query(Event)
        .filter(Event.deleted == False)
        .filter(Event.start_ts > _from_dt.timestamp())
        .filter(Event.start_ts < (datetime.now(TZ) + timedelta(weeks=4)).timestamp())
        .filter(Event.posted_vk != None)
        .filter(Event.posted_vk != "")
    )

    events = query.order_by(Event.start_ts).all()
    logger.info(f"Schedule includes {len(events)} events")

    result = "=== Лента всех мероприятий: [https://vk.com/kocherga_daily] ===\n\n-----\n<br>\n"

    prev_date = None
    for event in events:
        if event.start_dt.date() != prev_date:
            weekdays = [
                "Понедельник",
                "Вторник",
                "Среда",
                "Четверг",
                "Пятница",
                "Суббота",
                "Воскресенье",
            ]
            weekday = weekdays[event.start_dt.weekday()]
            month = kocherga.datetime.inflected_month(event.start_dt)
            result += f"==={weekday}, {event.start_dt.day} {month}===\n"
            prev_date = event.start_dt.date()

        result += (
            f"<blockquote>'''{event.start_dt:%H:%M}''' [{event.posted_vk}|{event.title}]\n"
        )
        result += f"{event.generate_summary()}</blockquote>\n"

    logger.debug(f"New schedule: {result}")

    group_id = group2id(kocherga.config.config()["vk"]["main_page"]["id"])
    page_id = group2id(kocherga.config.config()["vk"]["main_page"]["main_wall_page_id"])
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


def create_schedule_post(prefix_text):
    message = "#расписание_кочерги\n"
    message += prefix_text

    message += "\n\n"

    dt = datetime.today()
    if dt.weekday() < 2:
        dt = dt - timedelta(days=dt.weekday())
    else:
        dt = dt + timedelta(days=7 - dt.weekday())

    dt = dt.replace(hour=0, minute=0, second=0, microsecond=0)

    query = (
        Session()
        .query(Event)
        .filter(Event.deleted == False)
        .filter(Event.start_ts > dt.timestamp())
        .filter(Event.start_ts < (dt + timedelta(weeks=1)).timestamp())
        .filter(Event.posted_vk != None)
        .filter(Event.posted_vk != "")
    )

    events = query.order_by(Event.start_ts).all()
    logger.info(f"Schedule includes {len(events)} events")

    prev_date = None
    for event in events:
        if event.start_dt.date() != prev_date:
            weekday = kocherga.datetime.weekday(event.start_dt).upper()
            month = kocherga.datetime.inflected_month(event.start_dt)
            message += f"{weekday}, {event.start_dt.day} {month}\n"
            prev_date = event.start_dt.date()

        title = event.title
        if event.vk_group:
            title = f"@{event.vk_group} ({title})"
        message += f"{event.start_dt:%H:%M} {title}\n"
        message += f"{event.generate_summary()}\n\n"

    group_id = group2id(kocherga.config.config()["vk"]["main_page"]["id"])

    image_bytes = kocherga.images.image_storage.create_mailchimp_image(dt)
    photo_id = upload_wall_image(group_id, image_bytes)

    kocherga.vk.api.call(
        "wall.post",
        {
            "owner_id": -group_id,
            "from_group": 1,
            "message": message,
            "publish_date": int(datetime.now().timestamp()) + 86400,
            "attachments": photo_id,
        },
    )

def update_widget():
    from_dt = datetime.now(TZ).replace(hour=0, minute=0, second=0, microsecond=0)
    query = (
        Session()
        .query(Event)
        .filter(Event.deleted == False)
        .filter(Event.start_ts > from_dt.timestamp())
        .filter(Event.start_ts < (datetime.now(TZ) + timedelta(weeks=4)).timestamp())
        .filter(Event.event_type == "public")
        .filter(Event.posted_vk != None)
        .filter(Event.posted_vk != "")
    )
    events = query.order_by(Event.start_ts).limit(3).all()

    def event2time(event):
        day_codes = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
        day = day_codes[event.start_dt.weekday()]
        return f"{day} {event.start_dt:%H:%M}"

    group_id = group2id(kocherga.config.config()["vk"]["main_page"]["id"])
    page_id = group2id(kocherga.config.config()["vk"]["main_page"]["main_wall_page_id"])
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
