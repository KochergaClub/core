from datetime import date

import pytest
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType
from kocherga.staff.models import Member
from kocherga.watchmen.models import Shift, Watchman
from tests.helpers.graphql import QueryException, run_query


@pytest.fixture
def manager_user():
    user = get_user_model().objects.create_user('manager@example.com', is_staff=True)
    ct = ContentType.objects.get(app_label='watchmen', model='shift')
    permission = Permission.objects.get(content_type=ct, codename='manage')
    user.user_permissions.add(permission)
    return user


def test_list_by_staff(client, staff_user):
    client.force_login(staff_user)

    res = run_query(
        client,
        """
        query {
            shifts: watchmenShifts(from_date: "2019-03-01", to_date: "2019-03-15") {
                date
                shift
            }
        }
        """,
    )

    assert res['shifts'][0]['date'] == '2019-03-01'
    assert res['shifts'][-1]['date'] == '2019-03-15'


UPDATE_SHIFT_MUTATION = """
mutation UpdateShift($is_night: Boolean, $watchman_id: ID) {
    watchmenUpdateShift(params: {
        date: "2019-03-05"
        shift: "MORNING"
        is_night: $is_night
        watchman_id: $watchman_id
    }) {
        ... on WatchmenShift {
            is_night
            watchman {
                id
            }
        }
    }
}
"""


def test_update_by_staff(client, staff_user):
    client.force_login(staff_user)

    with pytest.raises(QueryException) as excinfo:
        run_query(client, UPDATE_SHIFT_MUTATION, {'is_night': True})

    assert (
        'Forbidden' in excinfo.value.errors[0]['message']
    )  # staff is not enough, should be manager


def test_update_unknown_watchman(client, manager_user):
    client.force_login(manager_user)

    with pytest.raises(QueryException) as excinfo:
        run_query(client, UPDATE_SHIFT_MUTATION, {'watchman_id': 123})

    assert (
        'Watchman matching query does not exist' in excinfo.value.errors[0]['message']
    )


def test_update_normal(client, manager_user):
    client.force_login(manager_user)
    member = Member.objects.create(
        user=manager_user,
        short_name='abc',
    )
    watchman = Watchman.objects.create(member=member)

    res = run_query(client, UPDATE_SHIFT_MUTATION, {'watchman_id': watchman.id})
    assert res['watchmenUpdateShift']['watchman']['id'] == str(watchman.id)

    shift = Shift.objects.get(date=date(2019, 3, 5), shift='MORNING')
    assert shift.watchman.member.short_name == 'abc'


def test_update_invalid(client, manager_user):
    client.force_login(manager_user)
    member = Member.objects.create(
        user=manager_user,
        short_name='abc',
    )
    watchman = Watchman.objects.create(member=member)

    with pytest.raises(QueryException) as excinfo:
        run_query(
            client,
            UPDATE_SHIFT_MUTATION,
            {'watchman_id': watchman.id, 'is_night': True},
        )

    assert (
        "watchman can't be set when is_night is set"
        in excinfo.value.errors[0]['message']
    )
