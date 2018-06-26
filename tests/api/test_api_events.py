import pytest
pytestmark = pytest.mark.usefixtures('db')

from urllib3.filepost import encode_multipart_formdata
from urllib3.fields import RequestField

import kocherga.events.db
import kocherga.config

@pytest.mark.asyncio
async def test_events(api_client, imported_events):
    res = await api_client.get('/events')
    assert res.status_code == 200
    events = await res.get_json()

    assert len(events) > 5

    assert '2017' in events[0]['start']['dateTime']

@pytest.mark.asyncio
async def test_events_from_date(api_client, imported_events):
    res = await api_client.get('/events?from_date=2018-01-01&to_date=2018-01-14')
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
        {
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

    assert b'JFIF' in open(kocherga.events.db.get_event(event.google_id).image_file('vk'), 'rb').read()[:10]

    assert res.status_code == 200


@pytest.mark.asyncio
async def test_upload_image_from_url(api_client, image_storage, event):
    res = await api_client.post(
        f'/event/{event.google_id}/image_from_url/default',
        form={
            'url': 'https://wiki.admin.kocherga.club/resources/assets/kch.png',
        }
    )

    assert b'PNG' in open(kocherga.events.db.get_event(event.google_id).image_file('default'), 'rb').read()[:10]

    assert res.status_code == 200

class TestPrototypes:
    @pytest.mark.asyncio
    async def test_list_empty(self, api_client):
        res = await api_client.get('/event_prototypes')
        assert res.status_code == 200
        prototypes = await res.get_json()

        assert type(prototypes) == list
        assert len(prototypes) == 0


    @pytest.mark.asyncio
    async def test_create(self, api_client):
        res = await api_client.post(
            '/event_prototypes',
            json={
                'title': 'hello',
                'weekday': 3,
                'hour': 15,
                'minute': 30,
                'length': 120,
            }
        )
        assert res.status_code == 200

        res = await api_client.get('/event_prototypes')
        assert res.status_code == 200
        prototypes = await res.get_json()

        assert type(prototypes) == list
        assert len(prototypes) == 1

    @pytest.mark.asyncio
    async def test_suggested_dates(self, api_client, common_prototype):
        res = await api_client.get(f'/event_prototypes/{common_prototype.prototype_id}/suggested_dates')
        assert res.status_code == 200
        dates = await res.get_json()

        assert type(dates) == list
        assert len(dates) == 5
