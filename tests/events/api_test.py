import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
    pytest.mark.google,  # events require google for now (don't forget to remove this later)
]

from kocherga.events.models import Event


def test_events(admin_client, imported_events):
    res = admin_client.get('/api/events')
    assert res.status_code == 200
    events = res.json()

    assert len(events) > 5

    assert '2017' in events[0]['start']


def test_events_from_date(admin_client, imported_events):
    res = admin_client.get(
        '/api/events?from_date=2018-01-01&to_date=2018-01-14',
    )
    assert res.status_code == 200
    events = res.json()

    assert len(events) > 5

    assert '2018' in events[0]['start']


def test_upload_image(admin_client, image_storage, event):
    res = admin_client.post(
        f'/api/event/{event.google_id}/image/vk',
        {
            'file': open('tests/images/vk', 'rb'),
        },
    )

    assert b'JFIF' in open(Event.by_id(event.google_id).image_file('vk'), 'rb').read()[:10]

    assert res.status_code == 200


def test_upload_image_from_url(admin_client, image_storage, event):
    res = admin_client.post(
        f'/api/event/{event.google_id}/image_from_url/default',
        {
            'url': 'https://wiki.admin.kocherga.club/resources/assets/kch.png',
        },
        format='json',
    )

    assert b'PNG' in open(Event.by_id(event.google_id).image_file('default'), 'rb').read()[:10]

    assert res.status_code == 200


def test_create(admin_client):
    res = admin_client.post(
        '/api/events',
        {
            'title': 'test event',
            'date': '2018-06-01',
            'startTime': '18:00',
            'endTime': '19:00',
        },
        format='json',
    )
    assert res.status_code == 201
    event_json = res.json()

    assert event_json['title'] == 'test event'

    res = admin_client.get(
        f'/api/event/{event_json["id"]}',
    )
    assert res.status_code == 200

    event_json = res.json()
    assert event_json['title'] == 'test event'


def test_public_events(client):
    res = client.get('/api/public_events')
    assert res.status_code == 200  # public_events without the specific date is allowed for now

    res = client.get('/api/public_events?date=2019-01-12')
    assert res.status_code == 200

    events = res.json()
    assert type(events) == list


def test_add_tag(event, admin_client):
    res = admin_client.post(
        f'/api/event/{event.google_id}/tag/mytag',
    )
    assert res.status_code == 200
    event.refresh_from_db()
    assert 'mytag' in event.tag_names()


def test_retrieve(event, admin_client):
    res = admin_client.get(
        f'/api/event/{event.google_id}',
    )
    assert res.status_code == 200
    assert res.json()['title'] == event.title


def test_update(event, admin_client):
    res = admin_client.patch(
        f'/api/event/{event.google_id}',
        {
            'title': 'updated title',
        },
        format='json',
    )
    assert res.status_code == 200
    assert res.json()['title'] == 'updated title'

    assert Event.objects.get(pk=event.google_id).title == 'updated title'


def test_update_announcement_field(event, admin_client):
    res = admin_client.patch(
        f'/api/event/{event.google_id}',
        {
            'vk_group': 'some_group',
        },
        format='json',
    )
    assert res.status_code == 200
    assert res.json()['vk_group'] == 'some_group'

    assert Event.objects.get(pk=event.google_id).vk_announcement.group == 'some_group'


def test_forbidden_update(event, admin_client):
    admin_client.patch(
        f'/api/event/{event.google_id}',
        {
            'prototype_id': 123,
        },
        format='json',
    )
    assert Event.objects.get(pk=event.google_id).prototype_id is None
