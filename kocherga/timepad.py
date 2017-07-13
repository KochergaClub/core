import os
import requests
import json
import re

from kocherga.common import credentials_dir

def token():
    file = os.path.join(credentials_dir(), 'timepad')
    with open(file) as fh:
        return fh.read().strip()

BASE_URL = 'https://api.timepad.ru/v1'
ORGANIZATION_ID = 53244

def check(url):
    match = re.match('https://kocherga\.timepad\.ru/event/(\d+)/$', url)
    if not match:
        raise Exception("Weird url: {}".format(url))
    timepad_id = int(match.group(1))
    r = requests.get(
        BASE_URL + '/events.json?organization_ids={}'.format(ORGANIZATION_ID)
    )
    r.raise_for_status()
    events = json.loads(r.text)['values']

    return timepad_id in [event['id'] for event in events]


def create(event):
    url = BASE_URL + '/events.json?token=' + token()
    data = {
        'organization': {
            'id': ORGANIZATION_ID,
        },
        'starts_at': event['start']['dateTime'],
        'name': event['summary'],
        'description_html': event['description'],
        'categories': [
            {
                'id': 462,
                'name': 'Другие события',
            },
        ],
        'location': {
            'city': 'Москва',
            'address': 'ул. Большая Дорогомиловская, д.5к2',
        },
        'ticket_types': [
            {
                'name': '2р / минута',
                'price': 0,
                'limit': 50,
                'sale_ends_at': event['start']['dateTime'],
            }
        ],
        'questions': [
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
            {
                "field_id": "name",
                "name": "Имя",
                "type": "text",
                "is_mandatory": True,
            },
        ],
        "properties": [
            "organization_letter_checkbox",
            "timepad_letter_checkbox"
        ],
        'access_status': 'private',
    }

    r = requests.post(
        url,
        data=json.dumps(data)
    )
    r.raise_for_status()
    return json.loads(r.text)
