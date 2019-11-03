import logging
logger = logging.getLogger(__name__)

from datetime import datetime, timedelta
import json
import re
import urllib

from django.db import models
from django.conf import settings
from django.utils import timezone
from annoying.fields import AutoOneToOneField

from kocherga.error import PublicError
from kocherga.images import image_storage
from kocherga.dateutils import TZ
import kocherga.dateutils

import kocherga.vk.api
from kocherga.vk.helpers import group2id, upload_wall_image

import kocherga.events.markup

from ..event import Event


class Manager(models.Manager):
    def repost_to_daily(self) -> int:
        # TODO - select VkAnnouncements instead, but don't forget to filter out only good events
        events = Event.objects.public_events(date=datetime.today().date())
        if len(events) == 0:
            logger.info('No events today')

        DAILY_GROUP_ID = group2id(settings.KOCHERGA_VK['daily_page'])

        operations = []
        for event in events:
            announcement = event.vk_announcement
            object_id = urllib.parse.parse_qs(urllib.parse.urlparse(announcement.link).query)['w']
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

    def all_groups(self):
        logger.info("Selecting all vk groups")
        query = self.values_list('group').distinct()
        groups = [row[0] for row in query.all()]
        logger.info(f"Got {len(groups)} groups")
        return groups

    def upcoming(self):
        from_dt = datetime.now(TZ).replace(hour=0, minute=0, second=0, microsecond=0)
        return (
            self
            .exclude(event__deleted=True)
            .filter(
                event__start__gt=from_dt,
                event__start__lt=(datetime.now(TZ) + timedelta(weeks=4)),
            )
            .exclude(link='')
            .order_by('event__start')
        )

    def update_wiki_schedule(self):
        logger.info("Selecting all vk groups")

        announcements = self.upcoming().all()
        logger.info(f"Schedule includes {len(announcements)} events")

        result = "=== Лента всех мероприятий: [https://vk.com/kocherga_daily] ===\n\n-----\n<br>\n"

        prev_date = None
        for announcement in announcements:
            event = announcement.event
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
                f"<blockquote>'''{start_local:%H:%M}''' [{announcement.link}|{event.title}]\n"
            )
            result += f"{event.generate_summary()}</blockquote>\n"

        logger.debug(f"New schedule: {result}")

        group_id = group2id(settings.KOCHERGA_VK["main_page"]["id"])
        page_id = group2id(settings.KOCHERGA_VK["main_page"]["main_wall_page_id"])
        r = kocherga.vk.api.call(
            "pages.get", {"owner_id": -group_id, "page_id": page_id, "need_source": 1}
        )

        position = r["source"].index(
            """</blockquote>\n\n-----\n\n[https://"""
        )
        position += len("</blockquote>\n")

        content = result + r["source"][position:]
        logger.debug(f"New wiki page content: {content}")

        r = kocherga.vk.api.call(
            "pages.save", {"group_id": group_id, "page_id": page_id, "text": content}
        )

        self.update_widget()

    def update_widget(self):
        announcements = self.upcoming()[:3].all()

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
                            "title": announcement.event.title,
                            "title_url": announcement.link,
                            "button": "Подробнее",
                            "button_url": announcement.link,
                            "time": event2time(announcement.event),
                        }
                        for announcement in announcements
                    ],
                    "title_url": wiki_url,
                    "more": "Все мероприятия",
                    "more_url": wiki_url
                }, ensure_ascii=False) + ";"
            },
            group_token=True
        )


class VkAnnouncement(models.Model):
    event = AutoOneToOneField(Event, on_delete=models.CASCADE, related_name='vk_announcement')

    link = models.CharField(max_length=1024, blank=True)

    group = models.CharField(max_length=40, blank=True)
    image = models.CharField(max_length=32, blank=True)

    objects = Manager()

    def get_tail(self):
        tail = (
            f"{self.event.timing_description} в @kocherga_club (центре рациональности Кочерга). "
            + "Оплата участия — по тарифам антикафе: 2,5 руб./минута. "
            + f"Регистрация: {self.event.public_link()}"
        )

        return tail

    def get_text(self):
        description = kocherga.events.markup.Markup(self.event.description or '').as_vk()
        return description + "\n\n***\n" + self.get_tail()

    def group_id(self):
        if not self.group:
            raise PublicError("Can't announce - group is not set")

        return group2id(self.group)

    def image_file(self):
        if not self.image:
            raise PublicError("Can't announce - add an image first")
        return image_storage.get_filename(self.image)

    def post_id(self):
        match = re.match(r'.*_(\d+)', self.link)
        return match.group(1)

    def add_image(self, fh):
        key = image_storage.add_file(fh)
        self.image = key
        self.save()

    def announce(self):
        group_id = self.group_id()

        image_file = self.image_file()

        photo_id = upload_wall_image(group_id, open(image_file, 'rb').read())
        message = self.get_text()

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
                "event_start_date": self.event.start.timestamp(),
                "event_finish_date": self.event.end.timestamp(),
            },
        )

        post_id = response['post_id']

        self.link = f"https://vk.com/{self.group}?w=wall-{group_id}_{post_id}"
        self.save()
