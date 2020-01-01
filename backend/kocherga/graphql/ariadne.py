from typing import cast

from graphql.type import GraphQLSchema, GraphQLObjectType

import ariadne


class DjangoObjectType(ariadne.ObjectType):
    def __init__(self, name: str, model):
        super().__init__(name)
        self._model = model

    # copy-pasted from ariadne.ObjectType
    def bind_to_schema(self, schema: GraphQLSchema) -> None:
        graphql_type = schema.type_map.get(self.name)
        self.validate_graphql_type(graphql_type)
        graphql_type = cast(GraphQLObjectType, graphql_type)
        self.create_django_fields(graphql_type)  # <----- our custom injection
        self.bind_resolvers_to_graphql_type(graphql_type)

    def create_django_fields(self, graphql_type: GraphQLObjectType):
        _meta = self._model._meta
        for name, field in graphql_type.fields.items():
            if name in self._resolvers:
                continue  # that's ok, set explicitly

            # validate!
            # TODO - compare field types
            # TODO - special handling for FK fields
            _meta.get_field(name)

    def related_field(self, field_name):
        # TODO - check that it's actually a related field

        @self.field(field_name)
        def resolve(obj, info):
            return getattr(obj, field_name).all()

    def simple_method_field(self, field_name):
        # TODO - check that it's actually a method on model

        @self.field(field_name)
        def resolve(obj, info):
            return getattr(obj, field_name)()
