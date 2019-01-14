import pytest
pytestmark = pytest.mark.usefixtures('db')

import json

from kocherga.events.event import Event
from kocherga.error import PublicError

def test_events(client, imported_events, kocherga_auth_header):
    res = client.get('/api/events', **kocherga_auth_header)
    assert res.status_code == 200
    events = res.json()

    assert len(events) > 5

    assert '2017' in events[0]['start']['dateTime']

def test_events_from_date(client, imported_events, kocherga_auth_header):
    res = client.get(
        '/api/events?from_date=2018-01-01&to_date=2018-01-14',
        **kocherga_auth_header
    )
    assert res.status_code == 200
    events = res.json()

    assert len(events) > 5

    assert '2018' in events[0]['start']['dateTime']

def test_upload_image(client, image_storage, event, kocherga_auth_header):
    res = client.post(
        f'/api/event/{event.google_id}/image/vk',
        {
            'file': open('tests/images/vk', 'rb'),
        },
        **kocherga_auth_header,
    )

    assert b'JFIF' in open(Event.by_id(event.google_id).image_file('vk'), 'rb').read()[:10]

    assert res.status_code == 200


def test_upload_image_from_url(client, image_storage, event, kocherga_auth_header):
    res = client.post(
        f'/api/event/{event.google_id}/image_from_url/default',
        json.dumps({
            'url': 'https://wiki.admin.kocherga.club/resources/assets/kch.png',
        }),
        content_type='application/json',
        **kocherga_auth_header,
    )

    assert b'PNG' in open(Event.by_id(event.google_id).image_file('default'), 'rb').read()[:10]

    assert res.status_code == 200

def test_create(client, kocherga_auth_header):
    res = client.post(
        '/api/events',
        json.dumps({
            'title': 'test event',
            'date': '2018-06-01',
            'startTime': '18:00',
            'endTime': '19:00',
        }),
        content_type='application/json',
        **kocherga_auth_header,
    )
    assert res.status_code == 200
    event_json = res.json()

    assert event_json['title'] == 'test event'

    res = client.get(
        f'/api/event/{event_json["id"]}',
        **kocherga_auth_header,
    )
    assert res.status_code == 200

    event_json = res.json()
    assert event_json['title'] == 'test event'

def test_public_events(client):
    res = client.get('/api/public_events')
    assert res.status_code == 400

    res = client.get('/api/public_events?date=2019-01-12')
    assert res.status_code == 200

    events = res.json()
    assert type(events) == list

def test_add_tag(event, client, kocherga_auth_header):
    res = client.post(
        f'/api/event/{event.google_id}/tag/mytag',
        content_type='application/json',
        **kocherga_auth_header,
    )
    assert res.status_code == 200
    event.refresh_from_db()
    assert 'mytag' in event.tag_names()
