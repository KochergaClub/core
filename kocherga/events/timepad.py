import logging
logger = logging.getLogger(__name__)

import os
import requests
import json
import re
import markdown
import logging
from collections import namedtuple

import kocherga.secrets
from kocherga.datetime import dts

from kocherga.events.announcement import BaseAnnouncement
import kocherga.events.markup

BASE_URL = 'https://api.timepad.ru/v1'

TIMEPAD_CONFIG = kocherga.config.config()['timepad']
ORGANIZATION = TIMEPAD_CONFIG['organization']
ORGANIZATION_ID = TIMEPAD_CONFIG['organization_id']

class TimepadAnnouncement(BaseAnnouncement):
    def __init__(self, timepad_event_id):
        self.timepad_event_id = timepad_event_id

    @property
    def link(self):
        return f'https://{ORGANIZATION}.timepad.ru/event/{self.timepad_event_id}'


def token():
    return kocherga.secrets.plain_secret('timepad_token')

def check(url):
    match = re.match(
        'https://{}\.timepad\.ru/event/(\d+)/$'.format(ORGANIZATION),
        url
    )
    if not match:
        raise Exception("Weird url: {}".format(url))
    timepad_id = int(match.group(1))
    r = requests.get(
        f'{BASE_URL}/events.json?organization_ids={ORGANIZATION_ID}'
    )
    r.raise_for_status()
    events = json.loads(r.text)['values']

    return timepad_id in [event['id'] for event in events]

def timepad_description(event):
    return kocherga.events.markup.Markup(event.description).as_html()

def timepad_summary(event):
    if event.summary:
        return event.summary
    summary = event.description.split('\n\n')[0]
    return kocherga.events.markup.Markup(summary).as_plain()

class TimepadCategory(namedtuple('TimepadCategory', 'id name code')):
    pass

def timepad_categories():
    return [
        TimepadCategory(*args)
        for args in (
                (217, 'Бизнес', 'business'),
                (374, 'Кино', 'cinema'),
                (376, 'Спорт', 'sport'),
                (379, 'Для детей', 'kids'),
                (382, 'Иностранные языки', 'languages'),
                (399, 'Красота и здоровье', 'beauty'),
                (452, 'ИТ и интернет', 'it'),
                (453, 'Психология и самопознание', 'psychology'),
                (456, 'Еда', 'food'),
                (457, 'Вечеринки', 'party'),
                (458, 'Выставки', 'exhibition'),
                (459, 'Театры', 'theater'),
                (460, 'Концерты', 'concert'),
                (461, 'Экскурсии и путешествия', 'trip'),
                (462, 'Другие события', 'other_event'),
                (463, 'Другие развлечения', 'other_entertainment'),
                (524, 'Хобби и творчество', 'hobby'),
                (525, 'Искусство и культура', 'art'),
                (1315, 'Образование за рубежом', 'education_abroad'),
                (1940, 'Гражданские проекты', 'civil'),
        )
    ]

def timepad_category_by_code(code):
    return next(c for c in timepad_categories() if c.code == code)

def create(event):
    url = BASE_URL + '/events.json?token=' + token()

    timepad_category = timepad_category_by_code(event.timepad_category_code or 'other_event')

    if event.timepad_prepaid_tickets:
        ticket_types = [
            {
                'name': kocherga.config.config()['tariff'],
                'description': 'оплата ПОСЛЕ мероприятия, по времени',
                'price': 0,
                'limit': 30,
                'sale_ends_at': dts(event.start_dt),
            },
            {
                'name': 'лекция + посещение',
                'description': 'Оплата ЗАРАНЕЕ, на месте подобный билет приобрести нельзя',
                'price': 300,
                'limit': 30,
                'sale_ends_at': dts(event.start_dt),
            },
        ]
    else:
        ticket_types = [
            {
                'name': kocherga.config.config()['tariff'],
                'description': 'Оплата по тарифам антикафе',
                'price': 0,
                'limit': 50,
                'sale_ends_at': dts(event.start_dt),
            }
        ]

    data = {
        'organization': {
            'id': ORGANIZATION_ID,
        },
        'starts_at': dts(event.start_dt),
        'ends_at': dts(event.end_dt),
        'name': event.title,
        'description_html': timepad_description(event),
        'description_short': timepad_summary(event),
        'categories': [
            {
                'id': timepad_category.id,
                'name': timepad_category.name,
            },
        ],
        'location': TIMEPAD_CONFIG['location'],
        'tickets_limit': 50,
        'ticket_types': ticket_types,
        'questions': [
            {
                'field_id': 'mail',
                'name': 'E-mail',
                'type': 'text',
                'is_mandatory': True,
            },
            {
                'field_id': 'surname',
                'name': 'Фамилия',
                'type': 'text',
                'is_mandatory': True,
            },
            {
                'field_id': 'name',
                'name': 'Имя',
                'type': 'text',
                'is_mandatory': True,
            },
        ],
        'properties': [
            'organization_letter_checkbox',
            'timepad_letter_checkbox',
        ],
        'access_status': 'private',
    }
    image = event.get_images().get('default', None)
    if image:
        data['poster_image_url'] = image

    logger.debug('creating timepad event %s', data)
    r = requests.post(
        url,
        json=data
    )
    logger.debug(r.text)
    r.raise_for_status()

    result = json.loads(r.text)

    return TimepadAnnouncement(result['id'])

def edit(announcement, patch):
    timepad_event_id = announcement.timepad_event_id
    url = BASE_URL + '/events/{}.json?token={}'.format(timepad_event_id, token())

    r = requests.post(
        url,
        data=json.dumps(patch)
    )
    r.raise_for_status()
