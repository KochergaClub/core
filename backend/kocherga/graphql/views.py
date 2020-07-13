from typing import cast

from django.http import HttpRequest
from django.conf import settings

from graphql import GraphQLSchema

from ariadne.types import GraphQLResult
from ariadne.format_error import format_error
from ariadne.graphql import graphql_sync
from ariadne.contrib.django.views import GraphQLView
from ariadne.contrib.tracing.apollotracing import ApolloTracingExtensionSync


class KochergaGraphQLView(GraphQLView):
    # Copy-pasted from GraphQLView.
    # TODO: refactor after https://github.com/mirumee/ariadne/pull/284 gets merged.
    def execute_query(self, request: HttpRequest, data: dict) -> GraphQLResult:
        context_value = request

        return graphql_sync(
            cast(GraphQLSchema, self.schema),
            data,
            context_value=context_value,
            root_value=self.root_value,
            debug=settings.DEBUG,
            logger=self.logger,
            validation_rules=self.validation_rules,
            error_formatter=self.error_formatter or format_error,
            extensions=[ApolloTracingExtensionSync] if settings.DEBUG else None,
            middleware=self.middleware,
        )
