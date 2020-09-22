import logging

logger = logging.getLogger(__name__)

from timeit import default_timer
from prometheus_client import Histogram

from django.http import HttpRequest
from django.conf import settings

from ariadne.types import GraphQLResult
from ariadne.contrib.django.views import GraphQLView
from ariadne.contrib.tracing.apollotracing import ApolloTracingExtensionSync

from kocherga.graphql.schema import schema

duration_histogram = Histogram(
    'graphql_request', 'Duration of GraphQL requests', ['operation']
)


class WrappedGraphQLView(GraphQLView):
    def execute_query(self, request: HttpRequest, data: dict) -> GraphQLResult:
        start = default_timer()
        result = super().execute_query(request, data)
        duration = default_timer() - start

        operation = data.get('operationName', None) or 'unknown operation'
        duration_histogram.labels(operation=operation).observe(duration)
        logger.info(f'GraphQL: {operation} [{duration:.3f}]')
        return result


kocherga_graphql_view = WrappedGraphQLView.as_view(
    schema=schema,
    extensions=[ApolloTracingExtensionSync] if settings.DEBUG else None,
    context_value=lambda request: request,
)
