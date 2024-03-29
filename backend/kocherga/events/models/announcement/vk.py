import logging

logger = logging.getLogger(__name__)

import json
import re
import urllib.parse
from datetime import datetime, timedelta

import kocherga.dateutils
import kocherga.events.markup
import kocherga.vk.api
import reversion
from annoying.fields import AutoOneToOneField
from django.conf import settings
from django.db import models
from django.utils import timezone
from kocherga.dateutils import TZ
from kocherga.error import PublicError
from kocherga.vk.helpers import group2id, upload_wall_image

from ..event import Event


class Manager(models.Manager):
    def repost_to_daily(self) -> int:
        # TODO - select VkAnnouncements instead, but don't forget to filter out only good events
        events = Event.objects.public_only().filter_by_date(
            date=datetime.today().date()
        )
        if len(events) == 0:
            logger.info('No events today')

        DAILY_GROUP_ID = group2id(settings.KOCHERGA_VK['daily_page'])

        operations = []
        for event in events:
            announcement = event.vk_announcement
            object_id = urllib.parse.parse_qs(
                urllib.parse.urlparse(announcement.link).query
            )['w']
            operations.append(
                {
                    'method': 'wall.repost',
                    'params': {'group_id': DAILY_GROUP_ID, 'object': object_id},
                }
            )

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

    def upcoming_events(self):
        return Event.objects.public_only().filter(
            start__gte=datetime.now(TZ) - timedelta(hours=2)
        )

    def update_wiki_schedule(self):
        main_page_settings = settings.KOCHERGA_VK["main_page"]
        if 'main_wall_page_id' not in main_page_settings:
            logger.info("main_wall_page_id is not set, can't update wiki schedule")
            return

        events = self.upcoming_events()
        logger.info(f"Schedule includes {len(events)} events")
        if len(events) == 0:
            return  # wiki page content becomes irreversible if we update it with 0 events

        result = "=== Лента всех мероприятий: [https://vk.com/kocherga_daily] ===\n\n-----\n<br>\n"

        prev_date = None
        for event in events:
            start_local = timezone.localtime(event.start)
            if start_local.date() != prev_date:
                weekday = kocherga.dateutils.WEEKDAY_NAMES[
                    start_local.weekday()
                ].capitalize()
                month = kocherga.dateutils.inflected_month(start_local)
                result += f"==={weekday}, {start_local.day} {month}===\n"
                prev_date = event.start.date()

            result += (
                (
                    f"<blockquote>'''{start_local:%H:%M}''' [{event.public_link()}|{event.title}]"
                )
                + (
                    f" [{event.vk_announcement.link}|(VK)]"
                    if event.vk_announcement.link
                    else ''
                )
                + "\n"
            )
            result += f"{event.generate_summary()}</blockquote>\n"

        logger.debug(f"New schedule: {result}")

        group_id = group2id(settings.KOCHERGA_VK["main_page"]["id"])
        page_id = group2id(settings.KOCHERGA_VK["main_page"]["main_wall_page_id"])
        r = kocherga.vk.api.call(
            "pages.get", {"owner_id": -group_id, "page_id": page_id, "need_source": 1}
        )

        position = r["source"].index("""</blockquote>\n\n-----\n\n[https://""")
        position += len("</blockquote>\n")

        content = result + r["source"][position:]
        logger.debug(f"New wiki page content: {content}")

        r = kocherga.vk.api.call(
            "pages.save", {"group_id": group_id, "page_id": page_id, "text": content}
        )

    def get_widget_config(self):
        main_page_settings = settings.KOCHERGA_VK["main_page"]
        if 'main_wall_page_id' not in main_page_settings:
            logger.info("main_wall_page_id is not set, can't update widget config")
            return

        events = self.upcoming_events()[:6].all()

        def event2time(event):
            day_codes = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
            start_local = timezone.localtime(event.start)
            day = day_codes[start_local.weekday()]
            return f"{day} {start_local:%H:%M}"

        group_id = group2id(main_page_settings["id"])
        page_id = group2id(main_page_settings["main_wall_page_id"])
        wiki_url = f"https://vk.com/page-{group_id}_{page_id}"

        widget_rows = []
        for event in events:
            button = "Подробнее"
            if event.vk_announcement.link:
                link = event.vk_announcement.link
                button = "Подробнее"
            else:
                link = wiki_url
                button = "В расписании"
            widget_rows.append(
                {
                    "title": event.title,
                    "title_url": link,
                    "button": button,
                    "button_url": link,
                    "time": event2time(event),
                }
            )

        return {
            "type": "compact_list",
            "code": "return "
            + json.dumps(
                {
                    "title": "Расписание",
                    "rows": widget_rows,
                    "title_url": wiki_url,
                    "more": "Все мероприятия",
                    "more_url": wiki_url,
                },
                ensure_ascii=False,
            )
            + ";",
        }

    def update_widget(self):
        widget_config = self.get_widget_config()
        # for dev
        if not widget_config:
            return

        kocherga.vk.api.call(
            "appWidgets.update", self.get_widget_config(), group_token=True
        )


@reversion.register()
class VkAnnouncement(models.Model):
    event = AutoOneToOneField(
        Event, on_delete=models.CASCADE, related_name='vk_announcement'
    )

    link = models.CharField(max_length=1024, blank=True)
    group = models.CharField(max_length=40, blank=True)

    image = models.ForeignKey(
        'kocherga_wagtail.CustomImage',
        null=True,
        blank=True,
        on_delete=models.PROTECT,
        related_name='+',
    )

    objects = Manager()

    def get_tail(self):
        if self.event.realm == 'offline':
            tail = f"{self.event.timing_description} в @kocherga_club (центре рациональности Кочерга). "
        elif self.event.realm == 'online':
            tail = f"{self.event.timing_description} в онлайн-формате. "
        else:
            raise Exception(f"Unknown realm {self.event.realm}")

        if self.event.pricing_type == 'anticafe':
            tail += "Оплата участия — по тарифам антикафе: 2,5 руб./минута. "
        elif self.event.pricing_type == 'free':
            tail += "Участие во встрече бесплатно. "

        tail += f"Регистрация: {self.event.public_link()}"

        return tail

    def get_text(self):
        description = kocherga.events.markup.Markup(
            self.event.description or ''
        ).as_vk()
        return description + "\n\n***\n" + self.get_tail()

    def group_id(self):
        if not self.group:
            raise PublicError("Can't announce - group is not set")

        return group2id(self.group)

    def post_id(self):
        match = re.match(r'.*_(\d+)', self.link)
        return match.group(1)

    def announce(self):
        group_id = self.group_id()

        # link = self.event.public_link()
        # kocherga.vk.api.call("pages.clearCache", {
        #     "url": link,
        # })

        if not self.image:
            raise PublicError("Can't announce - add an image first")
        photo_id = upload_wall_image(group_id, self.image.file.open('rb').read())

        message = self.get_text()

        response = kocherga.vk.api.call(
            "wall.post",
            {
                "owner_id": -group_id,
                "from_group": 1,
                "message": message,
                # "attachments": f'{photo_id},{link}',
                "attachments": f'{photo_id}',
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
