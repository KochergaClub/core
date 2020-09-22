import logging

logger = logging.getLogger(__name__)

from django.http import HttpRequest
from django.conf import settings

from ariadne.types import GraphQLResult
from ariadne.contrib.django.views import GraphQLView
from ariadne.contrib.tracing.apollotracing import ApolloTracingExtensionSync

from kocherga.graphql.schema import schema


class WrappedGraphQLView(GraphQLView):
    def execute_query(self, request: HttpRequest, data: dict) -> GraphQLResult:
        logger.info(
            'GraphQL: ' + (data.get('operationName', None) or 'unknown operation')
        )
        return super().execute_query(request, data)


kocherga_graphql_view = WrappedGraphQLView.as_view(
    schema=schema,
    extensions=[ApolloTracingExtensionSync] if settings.DEBUG else None,
    context_value=lambda request: request,
)
