from tests.helpers.graphql import run_query


my_tickets_query = """
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


def test_my_tickets_anon():
    (success, response) = run_query(my_tickets_query)
    assert success
    assert not response['data']
    assert 'Forbidden' in response['errors'][0]['message']


def test_my_tickets(basic_user):
    (success, response) = run_query(my_tickets_query, basic_user)
    assert response['data']
