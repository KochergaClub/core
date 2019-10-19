import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
    pytest.mark.google,  # events require google for now (don't forget to remove this later)
]

from django.contrib.auth import get_user_model


@pytest.fixture
def user1():
    return get_user_model().objects.create_user('u1@example.com')


@pytest.fixture
def user2():
    return get_user_model().objects.create_user('u2@example.com')


class TestList:
    def test_anon(self, client, public_event):
        res = client.get(f'/api/event/{public_event.google_id}/tickets')
        assert res.status_code == 403

    def test_list_by_user(self, client, public_event, user1):
        client.force_login(user1)
        res = client.get(f'/api/event/{public_event.google_id}/tickets')
        assert res.status_code == 403  # common users can't list tickets

    def test_list_by_admin(self, admin_client, public_event):
        res = admin_client.get(f'/api/event/{public_event.google_id}/tickets')
        assert res.status_code == 200
        assert len(res.json()) == 0


class TestMyCreate:
    def test_create_anon(self, client, public_event):
        res = client.post(f'/api/event/{public_event.google_id}/tickets/my')
        assert res.status_code == 403

    def test_create_ok(self, client, admin_user, public_event, user1):
        client.force_login(user1)
        res = client.post(f'/api/event/{public_event.google_id}/tickets/my')
        assert res.status_code == 201

        res = client.get(f'/api/event/{public_event.google_id}/tickets')
        assert res.status_code == 403  # still can't list tickets

        client.force_login(admin_user)
        res = client.get(f'/api/event/{public_event.google_id}/tickets')
        assert res.status_code == 200
        assert len(res.json()) == 1

    def test_create_double(self, client, public_event, user1):
        client.force_login(user1)
        res = client.post(f'/api/event/{public_event.google_id}/tickets/my')
        assert res.status_code == 201
        res = client.post(f'/api/event/{public_event.google_id}/tickets/my')
        assert res.status_code == 400


class TestMyGet:
    def test_my_anon(self, client, public_event):
        res = client.get(f'/api/event/{public_event.google_id}/tickets/my')
        assert res.status_code == 403

    def test_my_404(self, client, public_event, user1):
        client.force_login(user1)
        res = client.get(f'/api/event/{public_event.google_id}/tickets/my')
        assert res.status_code == 404

    def test_my_ok(self, client, public_event, user1):
        client.force_login(user1)

        res = client.post(f'/api/event/{public_event.google_id}/tickets/my')
        assert res.status_code == 201

        res = client.get(f'/api/event/{public_event.google_id}/tickets/my')
        assert res.status_code == 200


class TestMyDelete:
    def test_my_delete(self, client, public_event, user1):
        client.force_login(user1)

        res = client.post(f'/api/event/{public_event.google_id}/tickets/my')
        assert res.status_code == 201

        res = client.delete(f'/api/event/{public_event.google_id}/tickets/my')
        assert res.status_code == 204

        res = client.delete(f'/api/event/{public_event.google_id}/tickets/my')
        assert res.status_code == 404
