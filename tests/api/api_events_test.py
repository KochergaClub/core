import pytest
pytestmark = pytest.mark.usefixtures('db')

from urllib3.filepost import encode_multipart_formdata

from kocherga.events.event import Event

@pytest.mark.asyncio
async def test_events(api_client, imported_events):
    res = await api_client.get('/events')
    assert res.status_code == 200
    events = await res.get_json()

    assert len(events) > 5

    assert '2017' in events[0]['start']['dateTime']

@pytest.mark.asyncio
async def test_events_from_date(api_client, imported_events):
    res = await api_client.get(
        '/events',
        query_string={'from_date': '2018-01-01', 'to_date': '2018-01-14'}
    )
    assert res.status_code == 200
    events = await res.get_json()

    assert len(events) > 5

    assert '2018' in events[0]['start']['dateTime']

@pytest.mark.asyncio
async def test_upload_image(api_client, image_storage, event):
    body, content_type = encode_multipart_formdata({
        'file': ('vk', open('tests/images/vk', 'rb').read())
    })

    # 'data' param for test_client is implemented in quart but not released yet (at the time of this comment, 2018-03-13)
    # When it's released, this code can be replaced with the simpler version commented below.
    import quart.wrappers
    import asyncio
    request = quart.wrappers.Request(
        'POST',
        'http',
        f'/event/{event.google_id}/image/vk',
        query_string=b'',
        headers={
            'Content-Type': content_type,
            'Content-Length': len(body),
        },
    )
    request.body.set_result(body)
    res = await asyncio.ensure_future(api_client.app.handle_request(request))
    #res = await api_client.post(
    #    f'/event/{event.google_id}/image/vk',
    #    headers={
    #        'Content-Type': content_type,
    #    },
    #    data=body,
    #)

    assert b'JFIF' in open(Event.by_id(event.google_id).image_file('vk'), 'rb').read()[:10]

    assert res.status_code == 200


@pytest.mark.asyncio
async def test_upload_image_from_url(api_client, image_storage, event):
    res = await api_client.post(
        f'/event/{event.google_id}/image_from_url/default',
        form={
            'url': 'https://wiki.admin.kocherga.club/resources/assets/kch.png',
        }
    )

    assert b'PNG' in open(Event.by_id(event.google_id).image_file('default'), 'rb').read()[:10]

    assert res.status_code == 200

@pytest.mark.asyncio
async def test_create(api_client):
    res = await api_client.post(
        '/event',
        json={
            'title': 'test event',
            'start': '2018-06-01T18:00:00+03:00',
            'end': '2018-06-01T19:00:00+03:00',
        }
    )
    assert res.status_code == 200
    event_json = await res.get_json()

    assert event_json['title'] == 'test event'

    res = await api_client.get(
        f'/event/{event_json["id"]}'
    )
    assert res.status_code == 200

    event_json = await res.get_json()
    assert event_json['title'] == 'test event'
