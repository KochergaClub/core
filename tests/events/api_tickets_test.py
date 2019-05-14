import pytest
pytestmark = pytest.mark.usefixtures('db')

from django.contrib.auth import get_user_model


@pytest.fixture
def user1():
    return get_user_model().objects.create_user('u1@example.com')


@pytest.fixture
def user2():
    return get_user_model().objects.create_user('u2@example.com')


def test_anon(client, event):
    res = client.get(f'/api/event/{event.pk}/tickets')
    assert res.status_code == 403


def test_list_by_user(client, event, user1):
    client.force_login(user1)
    res = client.get(f'/api/event/{event.pk}/tickets')
    assert res.status_code == 403  # common users can't list tickets


def test_list_by_admin(admin_client, event):
    res = admin_client.get(f'/api/event/{event.pk}/tickets')
    assert res.status_code == 200
    assert len(res.json()) == 0


def test_create_anon(client, event):
    res = client.post(f'/api/event/{event.pk}/tickets', {})
    assert res.status_code == 403


def test_create_ok(client, admin_user, event, user1):
    client.force_login(user1)
    res = client.post(f'/api/event/{event.pk}/tickets', {})
    assert res.status_code == 201

    res = client.get(f'/api/event/{event.pk}/tickets')
    assert res.status_code == 403  # still can't list tickets

    client.force_login(admin_user)
    res = client.get(f'/api/event/{event.pk}/tickets')
    assert res.status_code == 200
    assert len(res.json()) == 1


def test_create_double(client, admin_user, event, user1):
    client.force_login(user1)
    res = client.post(f'/api/event/{event.pk}/tickets')
    assert res.status_code == 201
    res = client.post(f'/api/event/{event.pk}/tickets')
    assert res.status_code == 400
