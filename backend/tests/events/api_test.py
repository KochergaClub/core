from datetime import datetime, timedelta

from kocherga.dateutils import TZ

from kocherga.events.models import Event


def test_events(admin_client, common_events):
    res = admin_client.get('/api/events')
    assert res.status_code == 200
    events = res.json()

    assert len(events) > 3


def test_events_from_date(admin_client, common_events):
    dt = datetime(2017, 5, 1, tzinfo=TZ)
    Event.objects.create(
        start=dt,
        end=dt + timedelta(hours=1),
        title='old event',
    )

    res = admin_client.get(
        '/api/events?from_date=2017-01-01&to_date=2018-01-01',
    )
    assert res.status_code == 200
    events = res.json()

    assert len(events) == 1

    assert '2017' in events[0]['start']


def test_upload_image(admin_client, event):
    res = admin_client.post(
        f'/api/event/{event.uuid}/image/vk',
        {
            'file': open('tests/images/vk', 'rb'),
        },
    )
    assert res.status_code == 200

    event.refresh_from_db()
    assert b'JFIF' in event.vk_announcement.image.file.open('rb').read()[:10]


def test_upload_image_from_url(admin_client, event):
    res = admin_client.post(
        f'/api/event/{event.uuid}/image_from_url/default',
        {
            'url': 'https://wiki.admin.kocherga.club/resources/assets/kch.png',
        },
        format='json',
    )
    assert res.status_code == 200

    event.refresh_from_db()

    assert b'PNG' in event.image.file.open('rb').read()[:10]


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
    assert event_json['creator'] == 'admin@example.com'

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
        f'/api/event/{event.uuid}/tag/mytag',
    )
    assert res.status_code == 200
    event.refresh_from_db()
    assert 'mytag' in event.tag_names()


def test_retrieve(event, admin_client):
    res = admin_client.get(
        f'/api/event/{event.uuid}',
    )
    assert res.status_code == 200
    assert res.json()['title'] == event.title


def test_update(event, admin_client):
    res = admin_client.patch(
        f'/api/event/{event.uuid}',
        {
            'title': 'updated title',
        },
        format='json',
    )
    assert res.status_code == 200
    assert res.json()['title'] == 'updated title'

    assert Event.objects.get(pk=event.pk).title == 'updated title'


def test_update_announcement_field(event, admin_client):
    res = admin_client.patch(
        f'/api/event/{event.uuid}',
        {
            'vk_group': 'some_group',
        },
        format='json',
    )
    assert res.status_code == 200
    assert res.json()['vk_group'] == 'some_group'

    assert Event.objects.get(pk=event.pk).vk_announcement.group == 'some_group'


def test_forbidden_update(event, admin_client):
    admin_client.patch(
        f'/api/event/{event.uuid}',
        {
            'prototype_id': 123,
        },
        format='json',
    )
    assert Event.objects.get(pk=event.pk).prototype_id is None
