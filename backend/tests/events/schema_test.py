import pytest
from tests.helpers.graphql import run_query, QueryException


MY_TICKETS_QUERY = """
{
  my {
    tickets {
      event {
        event_id
        start
      }
    }
  }
}
"""


def test_my_tickets_anon(client):
    with pytest.raises(QueryException) as excinfo:
        run_query(client, MY_TICKETS_QUERY)

    assert 'Forbidden' in excinfo.value.errors[0]['message']


def test_my_tickets(client, basic_user):
    client.force_login(basic_user)
    run_query(client, MY_TICKETS_QUERY)
