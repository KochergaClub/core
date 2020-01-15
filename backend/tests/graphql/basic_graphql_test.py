from tests.helpers.graphql import run_query


def test_rooms(client):
    data = run_query(client, "{ rooms { name } }")

    assert len(data['rooms']) == 4
