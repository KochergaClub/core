import logging
logger = logging.getLogger(__name__)

import base64
from datetime import datetime, timedelta

import markdown

from django.template.loader import render_to_string
from django.db import models
from django.conf import settings
from django.utils import timezone

from kocherga.dateutils import TZ
import kocherga.dateutils
import kocherga.vk.api
import kocherga.vk.helpers
import kocherga.telegram
import kocherga.images
import kocherga.mailchimp
from kocherga.email.tools import get_utmify, mjml2html

from .event import Event

MAILCHIMP_IMAGE_FOLDER_NAME = 'Расписание на неделю'
MAILCHIMP_CAMPAIGN_FOLDER_NAME = 'Еженедельная рассылка'
TELEGRAM_HASHTAG = 'расписание_кочерги'
VK_HASHTAG = 'расписание_кочерги'


class WeeklyDigestManager(models.Manager):
    def current_digest(self):
        dt = datetime.now(TZ)
        if dt.weekday() < 2:
            dt = dt - timedelta(days=dt.weekday())
        else:
            dt = dt + timedelta(days=7 - dt.weekday())

        d = dt.date()
        (obj, _) = self.get_or_create(start=d)
        return obj


class WeeklyDigest(models.Model):
    start = models.DateField('Дата начала недели')
    mailchimp_id = models.CharField('ID кампании в Mailchimp', max_length=100, null=True, blank=True)
    mailchimp_sent = models.BooleanField('Mailchimp-кампания отправлена', default=False)
    telegram_id = models.CharField('ID сообщения в Telegram', max_length=100, null=True, blank=True)
    vk_id = models.CharField('ID поста в VK', max_length=100, null=True, blank=True)

    objects = WeeklyDigestManager()

    @property
    def end(self):
        return self.start + timedelta(days=6)

    def events(self):
        query = (
            Event.objects.list_events(
                from_date=self.start,
                to_date=self.end,
            )
            .exclude(posted_vk__isnull=True)
            .exclude(posted_vk='')
        )
        result = list(query.all())
        logger.info(f"Schedule includes {len(result)} events")
        return result

    def get_mailchimp_content(self, text, image_url):
        events = self.events()

        date2events = {}
        for event in events:
            d = timezone.localtime(event.start).strftime('%Y-%m-%d')
            if d not in date2events:
                date2events[d] = []
            date2events[d].append(event)

        events_by_date = [
            {
                "date": d,
                "events": date2events[d],
            }
            for d in sorted(date2events.keys())
        ]

        start_month = kocherga.dateutils.inflected_month(self.start)
        end_month = kocherga.dateutils.inflected_month(self.end)

        title_dates = ''
        if start_month == end_month:
            title_dates = f'{self.start.day} – {self.end.day} {start_month}'
        else:
            title_dates = f'{self.start.day} {start_month} – {self.end.day} {end_month}'

        def date2day(d):
            dt = datetime.strptime(d, '%Y-%m-%d')
            weekday = kocherga.dateutils.weekday(dt).capitalize()
            month = kocherga.dateutils.inflected_month(dt)
            return f"{weekday}, {dt.day} {month}"

        mjml = render_to_string('events/email/weekly_digest.mjml', {
            'text': markdown.markdown(text, extensions=['markdown.extensions.nl2br']),
            'image_url': image_url,
            'title_dates': title_dates,
            'events_by_date': events_by_date,
            'date2day': date2day,
            'utmify': get_utmify('weekly-digest', 'kocherga-newsletter'),
        })

        html = mjml2html(mjml)

        return {
            'title': f'Расписание мероприятий Кочерги на {title_dates}',
            'html': html,
        }

    def upload_mailchimp_image(self):
        image_content = kocherga.images.image_storage.create_mailchimp_image(self.start)

        image_folder_id = kocherga.mailchimp.image_folder_by_name(MAILCHIMP_IMAGE_FOLDER_NAME)['id']

        logger.info('Uploading weekly digest image to mailchimp')
        result = kocherga.mailchimp.api_call(
            'POST',
            f'file-manager/files',
            {
                'folder_id': image_folder_id,
                'name': f"weekly-image-{self.start.strftime('%Y-%m-%d')}.png",
                'file_data': base64.encodebytes(image_content).decode('utf-8'),
            }
        )

        return result['full_size_url']

    def post_mailchimp_draft(self, text=''):
        if self.mailchimp_id:
            raise Exception("Mailchimp draft already exists")

        image_url = self.upload_mailchimp_image()

        logger.info('Generating html content')
        content = self.get_mailchimp_content(text, image_url)

        logger.info('Creating campaign draft')
        campaign = kocherga.mailchimp.api_call('POST', 'campaigns', {
            'type': 'regular',
            'recipients': {
                'list_id': kocherga.mailchimp.MAIN_LIST_ID,
                'segment_opts': {
                    'saved_segment_id': kocherga.mailchimp.segment_by_name('Подписаны на расписание')['id'],
                },
            },
            'settings': {
                'subject_line': content['title'],
                'title': content['title'],
                'from_name': 'Кочерга',
                'reply_to': 'info@kocherga-club.ru',
                'to_name': '*|FNAME|* *|LNAME|*',
                'folder_id': kocherga.mailchimp.folder_id_by_name(MAILCHIMP_CAMPAIGN_FOLDER_NAME),
            },
            'tracking': {
                'google_analytics': f'weekly-digest-{self.start:%Y-%m-%d}',
            }
        })

        campaign_id = campaign['id']

        logger.info('Filling campaign content')
        kocherga.mailchimp.api_call('PUT', f'campaigns/{campaign_id}/content', {
            'html': content['html'],
        })
        self.mailchimp_id = campaign_id
        self.save()

    def _telegram_message(self):
        message = f"#{TELEGRAM_HASHTAG}\nНа этой неделе в Кочерге:"
        message += "\n\n"

        prev_date = None
        events = self.events()
        for event in events:
            start_local = timezone.localtime(event.start)
            if start_local.date() != prev_date:
                weekday = kocherga.dateutils.weekday(start_local).upper()
                month = kocherga.dateutils.inflected_month(start_local)
                message += f"{weekday}, {start_local.day} {month}\n"
                prev_date = start_local.date()

            title = event.title
            if event.posted_vk:
                title = f'<a href="{event.posted_vk}">{title}</a>'
            message += f"{start_local:%H:%M} {title}\n"
            message += f"{event.generate_summary()}\n\n"

        return message

    def post_telegram(self):
        if self.telegram_id:
            raise Exception("Telegram message is already sent")

        text = self._telegram_message()
        posted_message = kocherga.telegram.post_to_channel(text)
        self.telegram_id = posted_message['message_id']
        self.save()

    def post_vk(self, prefix_text):
        if self.vk_id:
            raise Exception("VK digest already posted")

        message = f"#{VK_HASHTAG}\n"
        message += prefix_text

        message += "\n\n"

        events = self.events()
        logger.info(f"Schedule includes {len(events)} events")

        prev_date = None
        for event in events:
            start_local = timezone.localtime(event.start)
            if start_local.date() != prev_date:
                weekday = kocherga.dateutils.weekday(start_local).upper()
                month = kocherga.dateutils.inflected_month(start_local)
                message += f"{weekday}, {start_local.day} {month}\n"
                prev_date = start_local.date()

            title = event.title
            if event.vk_group:
                title = f"@{event.vk_group} ({title})"
            message += f"{start_local:%H:%M} {title}\n"
            message += f"{event.generate_summary()}\n\n"

        group_id = kocherga.vk.helpers.group2id(settings.KOCHERGA_VK["main_page"]["id"])

        image_bytes = kocherga.images.image_storage.create_mailchimp_image(self.start)
        photo_id = kocherga.vk.helpers.upload_wall_image(group_id, image_bytes)

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

        self.vk_id = response['post_id']
        self.save()
