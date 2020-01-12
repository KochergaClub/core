from tests.helpers.graphql import run_query


def test_rooms():
    data = run_query("{ rooms { name } }")

    assert len(data['rooms']) > 3
