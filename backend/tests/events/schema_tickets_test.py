import pytest
from tests.helpers.graphql import run_query, QueryException

from django.contrib.auth import get_user_model


@pytest.fixture
def user1():
    return get_user_model().objects.create_user('u1@example.com')


@pytest.fixture
def user2():
    return get_user_model().objects.create_user('u2@example.com')


EVENT_WITH_TICKETS_QUERY = """
query EventWithTickets($event_id: ID!) {
    event(event_id: $event_id) {
        tickets {
            id
            status
        }
    }
}
"""


EVENT_WITH_MY_TICKET_QUERY = """
query EventWithTickets($event_id: ID!) {
    event: publicEvent(event_id: $event_id) {
        my_ticket {
            created
        }
    }
}
"""


REGISTER_MUTATION = """
mutation Register($event_id: ID!) {
    ticket: myEventsTicketRegister(event_id: $event_id) {
        created
    }
}
"""

UNREGISTER_MUTATION = """
mutation Unregister($event_id: ID!) {
    ticket: myEventsTicketUnregister(event_id: $event_id) {
        created
    }
}
"""


class TestList:
    def test_anon(self, client, public_event):
        with pytest.raises(QueryException) as excinfo:
            run_query(
                client,
                EVENT_WITH_TICKETS_QUERY,
                {'event_id': public_event.uuid}
            )
        assert 'Forbidden' in excinfo.value.errors[0]['message']  # anon users can't list tickets

    def test_list_by_user(self, client, public_event, user1):
        client.force_login(user1)
        with pytest.raises(QueryException) as excinfo:
            run_query(
                client,
                EVENT_WITH_TICKETS_QUERY,
                {'event_id': public_event.uuid}
            )
        assert 'Forbidden' in excinfo.value.errors[0]['message']  # common users can't list tickets

    def test_list_by_admin(self, admin_client, public_event):
        res = run_query(
            admin_client,
            EVENT_WITH_TICKETS_QUERY,
            {'event_id': public_event.uuid}
        )
        assert len(res['event']['tickets']) == 0


class TestMyCreate:
    def test_create_anon(self, client, public_event):
        with pytest.raises(QueryException) as excinfo:
            run_query(
                client,
                REGISTER_MUTATION,
                {'event_id': public_event.uuid}
            )
        assert 'Forbidden' in excinfo.value.errors[0]['message']

    def test_create_ok(self, client, admin_user, public_event, user1):
        client.force_login(user1)
        res = run_query(
            client,
            REGISTER_MUTATION,
            {'event_id': public_event.uuid}
        )
        assert res['ticket']['created']

        with pytest.raises(QueryException) as excinfo:
            run_query(
                client,
                EVENT_WITH_TICKETS_QUERY,
                {'event_id': public_event.uuid}
            )
        assert 'Forbidden' in excinfo.value.errors[0]['message']  # still can't list tickets

        client.force_login(admin_user)
        res = run_query(
            client,
            EVENT_WITH_TICKETS_QUERY,
            {'event_id': public_event.uuid}
        )
        assert len(res['event']['tickets']) == 1

    def test_create_double(self, client, public_event, user1):
        client.force_login(user1)

        for i in range(2):
            # double registration is ok (no errors)
            res = run_query(
                client,
                REGISTER_MUTATION,
                {'event_id': public_event.uuid}
            )
            assert res['ticket']['created']


class TestMyGet:
    def test_my_anon(self, client, public_event):
        res = run_query(
            client,
            EVENT_WITH_MY_TICKET_QUERY,
            {'event_id': public_event.uuid}
        )
        assert res['event']['my_ticket'] is None

    def test_my_404(self, client, public_event, user1):
        client.force_login(user1)
        res = run_query(
            client,
            EVENT_WITH_MY_TICKET_QUERY,
            {'event_id': public_event.uuid}
        )
        assert res['event']['my_ticket'] is None

    def test_my_ok(self, client, public_event, user1):
        client.force_login(user1)

        run_query(
            client,
            REGISTER_MUTATION,
            {'event_id': public_event.uuid}
        )

        res = run_query(
            client,
            EVENT_WITH_MY_TICKET_QUERY,
            {'event_id': public_event.uuid}
        )
        assert res['event']['my_ticket']['created']


class TestMyUnregister:
    def test_my_delete(self, client, public_event, user1, admin_user):
        client.force_login(user1)

        # register...
        run_query(
            client,
            REGISTER_MUTATION,
            {'event_id': public_event.uuid}
        )

        # ...and unregister
        run_query(
            client,
            UNREGISTER_MUTATION,
            {'event_id': public_event.uuid}
        )

        client.force_login(admin_user)

        res = run_query(
            client,
            EVENT_WITH_TICKETS_QUERY,
            {'event_id': public_event.uuid}
        )
        assert res['event']['tickets'][0]['status'] == 'inactive'

        client.force_login(user1)

        res = client.post(f'/api/events/{public_event.uuid}/my_ticket/unregister')
        # double unregister is ok
        run_query(
            client,
            UNREGISTER_MUTATION,
            {'event_id': public_event.uuid}
        )

        client.force_login(admin_user)

        res = run_query(
            client,
            EVENT_WITH_TICKETS_QUERY,
            {'event_id': public_event.uuid}
        )
        assert res['event']['tickets'][0]['status'] == 'inactive'

# TODO - test anon registration
