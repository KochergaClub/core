import logging
logger = logging.getLogger(__name__)

import re
from collections import namedtuple

from django.conf import settings
from django.db import models
from annoying.fields import AutoOneToOneField

from kocherga.dateutils import dts
import kocherga.events.markup
from kocherga.timepad.api import api_call, ORGANIZATION_ID

from ..event import Event

TIMEPAD_CONFIG = settings.KOCHERGA_TIMEPAD
ORGANIZATION = TIMEPAD_CONFIG["organization"]
SUBSCRIBERS_LIST_ID = TIMEPAD_CONFIG["subscribers_list_id"]
DEFAULT_ACCESS_STATUS = TIMEPAD_CONFIG["default_access_status"]


class TimepadAnnouncementManager(models.Manager):
    def find_by_timepad_id(self, id: int):
        link = f'https://{ORGANIZATION}.timepad.ru/event/{id}'
        announcement = self.get(
            link__in=[link, link + '/']
        )
        return announcement


def check(url):
    match = re.match(r"https://{}\.timepad\.ru/event/(\d+)/$".format(ORGANIZATION), url)
    if not match:
        raise Exception("Weird url: {}".format(url))
    timepad_id = int(match.group(1))

    result = api_call('GET', 'events', {
        'organization_ids': ORGANIZATION_ID,
    })
    events = result["values"]

    return timepad_id in [event["id"] for event in events]


class TimepadCategory(namedtuple("TimepadCategory", "id name code")):
    pass


def timepad_categories():
    return [
        TimepadCategory(*args)
        for args in (
            (462, "Другие события", "other_event"),
            (463, "Другие развлечения", "other_entertainment"),
            (2335, "Интеллектуальные игры", "smart_games"),
            (1940, "Гражданские проекты", "civil"),
            (382, "Иностранные языки", "languages"),
            (452, "ИТ и интернет", "it"),
            (453, "Психология и самопознание", "psychology"),
            (2465, "Наука", "science"),
            (217, "Бизнес", "business"),
            (374, "Кино", "cinema"),
            (457, "Вечеринки", "party"),
            (379, "Для детей", "kids"),
            (524, "Хобби и творчество", "hobby"),
            (456, "Еда", "food"),
            (459, "Театры", "theater"),
            #                (525, 'Искусство и культура', 'art'),
            #                (376, 'Спорт', 'sport'),
            #                (399, 'Красота и здоровье', 'beauty'),
            #                (458, 'Выставки', 'exhibition'),
            #                (460, 'Концерты', 'concert'),
            #                (461, 'Экскурсии и путешествия', 'trip'),
            #                (1315, 'Образование за рубежом', 'education_abroad'),
        )
    ]


def timepad_category_by_code(code):
    return next(c for c in timepad_categories() if c.code == code)


class TimepadAnnouncement(models.Model):
    event = AutoOneToOneField(Event, on_delete=models.CASCADE, related_name='timepad_announcement')

    link = models.CharField(max_length=1024, blank=True)

    category_code = models.CharField(max_length=40, blank=True)
    prepaid_tickets = models.BooleanField(default=False)

    objects = TimepadAnnouncementManager()

    def description(self):
        event = self.event
        tail = f"*{event.timing_description} в [центре рациональности Кочерга]({settings.KOCHERGA_WEBSITE}).*\n\n"
        if event.vk_announcement.group:
            link = "https://vk.com/" + event.vk_announcement.group
            tail += f'* <a href="{link}" target="_blank">Мероприятие вконтакте</a>\n'
        if event.fb_announcement.group:
            link = "https://www.facebook.com/groups/" + event.fb_announcement.group
            tail += f'* <a href="{link}" target="_blank">Мероприятие в facebook</a>\n'

        text = event.description + "\n\n---\n\n" + tail
        return kocherga.events.markup.Markup(text).as_html()

    def announce(self):
        timepad_category = timepad_category_by_code(
            self.category_code or "other_event"
        )

        if self.prepaid_tickets:
            ticket_types = [
                {
                    "name": settings.KOCHERGA_TARIFF,
                    "description": "оплата ПОСЛЕ мероприятия, по времени",
                    "price": 0,
                    "limit": 30,
                    "sale_ends_at": dts(self.event.start),
                },
                {
                    "name": "лекция + посещение",
                    "description": "Оплата ЗАРАНЕЕ, на месте подобный билет приобрести нельзя",
                    "price": 300,
                    "limit": 30,
                    "sale_ends_at": dts(self.event.start),
                },
            ]
        else:
            ticket_types = [
                {
                    "name": "По тарифам антикафе",
                    "description": settings.KOCHERGA_TARIFF,
                    "price": 0,
                    "limit": 50,
                    "sale_ends_at": dts(self.event.start),
                }
            ]

        data = {
            "organization": {"id": ORGANIZATION_ID},
            "starts_at": dts(self.event.start),
            "ends_at": dts(self.event.end),
            "name": self.event.title,
            "description_html": self.description(),
            "description_short": self.event.generate_summary(),
            "categories": [{"id": timepad_category.id, "name": timepad_category.name}],
            "location": TIMEPAD_CONFIG["location"],
            "tickets_limit": 50,
            "ticket_types": ticket_types,
            "questions": [
                {
                    "field_id": "mail",
                    "name": "E-mail",
                    "type": "text",
                    "is_mandatory": True,
                },
                {
                    "field_id": "surname",
                    "name": "Фамилия",
                    "type": "text",
                    "is_mandatory": True,
                },
                {"field_id": "name", "name": "Имя", "type": "text", "is_mandatory": True},
            ],
            "properties": ["organization_letter_checkbox", "timepad_letter_checkbox"],
            "access_status": DEFAULT_ACCESS_STATUS,
        }
        image = self.event.get_images().get("default", None)
        if image:
            data["poster_image_url"] = image

        logger.debug("creating timepad event %s", data)
        result = api_call('POST', 'events', data)

        timepad_event_id = result['id']
        self.link = f"https://{ORGANIZATION}.timepad.ru/event/{timepad_event_id}"
        self.save()

    def get_timepad_event_id(self):
        if not self.link:
            raise Exception("This announcement doesn't have timepad link")

        match = re.match(r"https://(?:.+)\.timepad\.ru/event/(\d+)/?$", self.link)
        if not match:
            raise Exception(f"Weird url: {self.link}")
        timepad_event_id = int(match.group(1))

        return timepad_event_id
