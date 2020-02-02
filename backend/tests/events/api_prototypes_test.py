from kocherga.events.models import EventPrototype


class TestPrototypes:
    def test_list_as_anon(self, client):
        res = client.get('/api/event_prototypes')
        assert res.status_code == 403

    def test_list_as_user(self, client):
        res = client.get('/api/event_prototypes')
        assert res.status_code == 403

    def test_list_empty(self, admin_client):
        res = admin_client.get('/api/event_prototypes')
        assert res.status_code == 200
        prototypes = res.json()

        assert type(prototypes) == list
        assert len(prototypes) == 0

    def test_list_populated(self, admin_client, common_prototype):
        res = admin_client.get('/api/event_prototypes')
        assert res.status_code == 200
        prototypes = res.json()

        assert type(prototypes) == list
        assert len(prototypes) == 1

    def test_create(self, admin_client):
        res = admin_client.post(
            '/api/event_prototypes',
            {
                'title': 'hello',
                'location': 'лекционная',
                'weekday': 3,
                'hour': 15,
                'minute': 30,
                'length': 120,
            },
            format='json',
        )
        assert res.status_code == 201

        res = admin_client.get('/api/event_prototypes')
        assert res.status_code == 200
        prototypes = res.json()

        assert type(prototypes) == list
        assert len(prototypes) == 1

    def test_upload_image(self, admin_client, common_prototype):
        res = admin_client.post(
            f'/api/event_prototypes/{common_prototype.prototype_id}/image',
            {
                'file': open('tests/images/default', 'rb'),
            },
        )

        assert b'JFIF' in EventPrototype.by_id(common_prototype.prototype_id).image.file.open('rb').read()[:10]

        assert res.status_code == 200
