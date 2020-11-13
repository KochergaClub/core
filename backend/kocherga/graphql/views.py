import logging

logger = logging.getLogger(__name__)

from timeit import default_timer

from ariadne.contrib.django.views import GraphQLView
from ariadne.contrib.tracing.apollotracing import ApolloTracingExtensionSync
from ariadne.types import GraphQLResult
from django.conf import settings
from django.http import HttpRequest
from kocherga.graphql.schema import schema
from prometheus_client import Counter, Histogram

duration_histogram = Histogram(
    'graphql_request', 'Duration of GraphQL requests', ['operation']
)

failures_counter = Counter(
    'graphql_request_failures', 'Number of GraphQL errors', ['operation']
)


class WrappedGraphQLView(GraphQLView):
    def execute_query(self, request: HttpRequest, data: dict) -> GraphQLResult:
        operation = data.get('operationName', None) or 'UNKNOWN'

        with failures_counter.labels(operation=operation).count_exceptions():
            start = default_timer()
            # logger.info(
            #     f"{operation} {request.get_full_path()} {request.COOKIES.get('sessionid')}"
            # )
            result = super().execute_query(request, data)
            duration = default_timer() - start

            duration_histogram.labels(operation=operation).observe(duration)
            logger.info(f'Operation {operation} [{duration:.3f}]')
            return result


kocherga_graphql_view = WrappedGraphQLView.as_view(
    schema=schema,
    extensions=[ApolloTracingExtensionSync] if settings.DEBUG else None,
    context_value=lambda request: request,
)
