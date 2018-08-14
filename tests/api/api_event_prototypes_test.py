import pytest
pytestmark = pytest.mark.usefixtures('db')

from urllib3.filepost import encode_multipart_formdata
from urllib3.fields import RequestField

from kocherga.events.prototype import EventPrototype

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
                'location': 'лекционная',
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

    @pytest.mark.asyncio
    async def test_upload_image(self, api_client, image_storage, common_prototype):
        body, content_type = encode_multipart_formdata({
            'file': ('image', open('tests/images/default', 'rb').read())
        })

        # 'data' param for test_client is implemented in quart but not released yet (at the time of this comment, 2018-03-13)
        # When it's released, this code can be replaced with the simpler version commented below.
        import quart.wrappers
        import asyncio
        request = quart.wrappers.Request(
            'POST',
            'http',
            f'/event_prototypes/{common_prototype.prototype_id}/image',
            query_string=b'',
            headers={
                'Content-Type': content_type,
                'Content-Length': len(body),
            },
        )
        request.body.set_result(body)
        res = await asyncio.ensure_future(api_client.app.handle_request(request))

        assert b'JFIF' in open(EventPrototype.by_id(common_prototype.prototype_id).image_file(), 'rb').read()[:10]

        assert res.status_code == 200
