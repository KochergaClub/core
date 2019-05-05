import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
]

from datetime import date

from freezegun import freeze_time

from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType

from kocherga.staff.models import Member
from kocherga.watchmen.models import Shift


@pytest.fixture
def basic_user(django_user_model):
    return django_user_model.objects.create_user('somebody@example.com')


@pytest.fixture
def staff_user(django_user_model):
    return django_user_model.objects.create_user('somebody@example.com', is_staff=True)


@pytest.fixture
def manager_user(django_user_model):
    user = django_user_model.objects.create_user('somebody@example.com', is_staff=True)
    ct = ContentType.objects.get(app_label='watchmen', model='shift')
    permission = Permission.objects.get(content_type=ct, codename='manage')
    user.user_permissions.add(permission)
    return user


def test_list_by_anon(client):
    res = client.get(
        '/api/watchmen/schedule',
        content_type='application/json',
    )
    assert res.status_code == 403


def test_list_by_basic_user(client, basic_user):
    client.force_login(basic_user)

    res = client.get(
        '/api/watchmen/schedule',
        content_type='application/json',
    )
    assert res.status_code == 403


def test_list_by_staff(client, staff_user):
    client.force_login(staff_user)

    with freeze_time('2019-03-01 10:00'):
        res = client.get(
            '/api/watchmen/schedule',
            content_type='application/json',
        )
        assert res.status_code == 200

        data = res.json()
        assert data[0]['date'] == '2019-02-25'
        assert data[-1]['date'] == '2019-03-24'


def test_update_by_staff(client, staff_user):
    client.force_login(staff_user)

    res = client.put(
        '/api/watchmen/schedule/2019-03-05/MORNING',
        {},
        content_type='application/json',
    )
    assert res.status_code == 403  # staff is not enough, should be manager


def test_update_unknown_watchman(client, manager_user):
    client.force_login(manager_user)

    res = client.patch(
        '/api/watchmen/schedule/2019-03-05/MORNING',
        {'watchman': 'hello'},
        content_type='application/json',
    )
    assert res.status_code == 400


def test_update(client, manager_user):
    client.force_login(manager_user)
    watchman = Member.objects.create(
        user=manager_user,
        short_name='abc',
        is_current=True,
    )

    res = client.patch(
        '/api/watchmen/schedule/2019-03-05/MORNING',
        {'watchman': watchman.short_name},
        content_type='application/json',
    )
    assert res.status_code == 200

    shift = Shift.objects.get(date=date(2019, 3, 5), shift='MORNING')
    assert shift.watchman.short_name == 'abc'


def test_update_invalid(client, manager_user):
    client.force_login(manager_user)
    watchman = Member.objects.create(
        user=manager_user,
        short_name='abc',
        is_current=True,
    )

    res = client.patch(
        '/api/watchmen/schedule/2019-03-05/MORNING',
        {'watchman': watchman.short_name, 'is_night': True},
        content_type='application/json',
    )
    assert res.status_code == 400
    print(res.json())
    assert "watchman can't be set when is_night is set" in res.json()
