from tests.helpers.graphql import run_query


def test_rooms():
    (success, response) = run_query("{ rooms { name } }")

    assert(success)
    assert len(response['data']['rooms']) > 3
