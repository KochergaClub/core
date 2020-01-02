from ariadne import graphql_sync
from kocherga.graphql.schema import schema


def test_now():
    (success, response) = graphql_sync(
        schema,
        {
            "query": "{ now { total } }"
        }
    )

    assert(success)
    assert response['data']['now']['total'] >= 0
