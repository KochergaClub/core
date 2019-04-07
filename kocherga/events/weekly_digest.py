import logging
logger = logging.getLogger(__name__)

from django.template.loader import render_to_string
from django.utils import timezone

import markdown

import base64

import kocherga.mailchimp
import kocherga.images
from kocherga.email.tools import get_utmify, mjml2html

from .models import Event

import kocherga.dateutils
from kocherga.dateutils import TZ
from datetime import timedelta, datetime

IMAGE_FOLDER_NAME = 'Расписание на неделю'


def get_week_boundaries():
    dt = datetime.now(TZ)
    if dt.weekday() < 2:
        dt = dt - timedelta(days=dt.weekday())
    else:
        dt = dt + timedelta(days=7 - dt.weekday())

    dt = dt.replace(hour=0, minute=0, second=0, microsecond=0)

    end_dt = dt + timedelta(days=6)

    return (dt, end_dt)


def generate_content(text, image_url):
    (dt, end_dt) = get_week_boundaries()

    query = (
        Event.objects
        .filter(
            start__gt=dt,
            start__lt=(dt + timedelta(weeks=1)),
        )
        .exclude(posted_vk__isnull=True)
        .exclude(posted_vk='')
    )
    events = query.order_by('start').all()

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

    start_month = kocherga.dateutils.inflected_month(dt)
    end_month = kocherga.dateutils.inflected_month(end_dt)

    title_dates = ''
    if start_month == end_month:
        title_dates = f'{dt.day} – {end_dt.day} {start_month}'
    else:
        title_dates = f'{dt.day} {start_month} – {end_dt.day} {end_month}'

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


def get_image_folder_id():
    folders = kocherga.mailchimp.api_call(
        'GET',
        '/file-manager/folders',
    )['folders']

    return next(f for f in folders if f['name'] == IMAGE_FOLDER_NAME)['id']


def upload_main_image():
    (dt, _) = get_week_boundaries()

    image_content = kocherga.images.image_storage.create_mailchimp_image(dt)

    logger.info('Uploading weekly digest image to mailchimp')
    result = kocherga.mailchimp.api_call(
        'POST',
        f'file-manager/files',
        {
            'folder_id': get_image_folder_id(),
            'name': f"weekly-image-{dt.strftime('%Y-%m-%d')}.png",
            'file_data': base64.encodebytes(image_content).decode('utf-8'),
        }
    )

    return result['full_size_url']


def create_draft(text=''):
    image_url = upload_main_image()

    logger.info('Generating html content')
    content = generate_content(text, image_url)

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
            'folder_id': kocherga.mailchimp.folder_id_by_name('Еженедельная рассылка'),
        },
        'tracking': {
            'google_analytics': f'weekly-digest-{get_week_boundaries()[0]:%Y-%m-%d}',
        }
    })

    campaign_id = campaign['id']

    logger.info('Filling campaign content')
    kocherga.mailchimp.api_call('PUT', f'campaigns/{campaign_id}/content', {
        'html': content['html'],
    })
