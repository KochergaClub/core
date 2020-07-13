from tests.helpers.graphql import run_query


def test_auth(client):
    data = run_query(client, "{ my { user { is_authenticated } } }")
    assert data['my']['user']['is_authenticated'] is False
