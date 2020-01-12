from ariadne import graphql_sync
from dataclasses import dataclass

from django.contrib.auth.models import AnonymousUser
from django.test import RequestFactory

from kocherga.graphql.schema import schema


class QueryException(Exception):
    def __init__(self, message, errors):
        super().__init__(message)
        self.errors = errors


@dataclass
class TestGraphQLContext:
    user: object


def run_query(client, query_string, variables=None):
    res = client.post(
        '/api/graphql',
        {
            'query': query_string,
            'variables': variables,
        },
        format='json',
    )

    if res.status_code != 200:
        raise Exception("No success")

    response = res.json()
    if 'errors' in response:
        raise QueryException("Errors in response", response['errors'])

    return response['data']
