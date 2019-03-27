import pytest
pytestmark = pytest.mark.usefixtures('db')

import json

from kocherga.events.models import EventPrototype


class TestPrototypes:
    def test_list_empty(self, client, kocherga_auth_header):
        res = client.get('/api/event_prototypes', **kocherga_auth_header)
        assert res.status_code == 200
        prototypes = res.json()

        assert type(prototypes) == list
        assert len(prototypes) == 0

    def test_create(self, client, kocherga_auth_header):
        res = client.post(
            '/api/event_prototypes',
            json.dumps({
                'title': 'hello',
                'location': 'лекционная',
                'weekday': 3,
                'hour': 15,
                'minute': 30,
                'length': 120,
            }),
            content_type='application/json',
            **kocherga_auth_header,
        )
        assert res.status_code == 200

        res = client.get('/api/event_prototypes', **kocherga_auth_header)
        assert res.status_code == 200
        prototypes = res.json()

        assert type(prototypes) == list
        assert len(prototypes) == 1

    def test_upload_image(self, client, image_storage, common_prototype, kocherga_auth_header):
        res = client.post(
            f'/api/event_prototypes/{common_prototype.prototype_id}/image',
            {
                'file': open('tests/images/default', 'rb'),
            },
            **kocherga_auth_header,
        )

        assert b'JFIF' in open(EventPrototype.by_id(common_prototype.prototype_id).image_file(), 'rb').read()[:10]

        assert res.status_code == 200
