from ariadne import graphql_sync
from dataclasses import dataclass
from django.contrib.auth.models import AnonymousUser

from kocherga.graphql.schema import schema


@dataclass
class TestGraphQLContext:
    user: object


def run_query(query_string, user=None):
    return graphql_sync(
        schema,
        {
            "query": query_string
        },
        context_value=TestGraphQLContext(user=user or AnonymousUser())
    )
