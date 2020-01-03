from tests.helpers.graphql import run_query


def test_now():
    (success, response) = run_query("{ now { total } }")

    assert(success)
    assert response['data']['now']['total'] >= 0
