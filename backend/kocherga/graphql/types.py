from typing import cast

from django.db import models
import wagtail.core.rich_text
from graphql.type import GraphQLSchema, GraphQLObjectType

import ariadne


class DjangoObjectType(ariadne.ObjectType):
    def __init__(self, name: str, model):
        super().__init__(name)
        assert issubclass(model, models.Model)
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
                continue  # That's ok, resolver is defined explicitly.

            if len(graphql_type.interfaces) and graphql_type.interfaces[0].name == 'WagtailPage' and name == 'meta':
                continue  # Special case: `WagtailPage` interface implements `meta` resolver.

            # validate!
            # TODO - compare field types
            # TODO - special handling for FK fields
            # TODO - support methods and properties
            # TODO - wrap FK resolvers in sync_to_async
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

    def simple_property_field(self, field_name):
        # TODO - check that it's actually a property on model

        @self.field(field_name)
        def resolve(obj, info):
            return getattr(obj, field_name)

    def image_field(self, field_name):

        @self.field(field_name)
        def resolve(obj, info, spec):
            image = getattr(obj, field_name)
            if not image:
                return None
            return image.get_rendition(spec)

    def rich_text_field(self, field_name):
        # via https://github.com/wagtail/wagtail/issues/2695 - fixing <embed> in RichTextFields

        @self.field(field_name)
        def resolve(obj, info):
            value = getattr(obj, field_name)
            return wagtail.core.rich_text.expand_db_html(value)


class PrefixedMixin:
    """Mixing for QueryType and MutationType (don't use on ObjectType!)"""
    def __init__(self, prefix):
        self._kch_prefix = prefix
        super().__init__()

    def field(self, name: str):
        def wrapper(f):
            self.set_field(self._kch_prefix + name, f)
            return f

        return wrapper


class PrefixedQueryType(PrefixedMixin, ariadne.QueryType):
    pass


class PrefixedMutationType(PrefixedMixin, ariadne.MutationType):
    pass


class DjangoObjectMutationType(ariadne.MutationType):
    def __init__(self, id_argument, prefix, model):
        self._kch_id_argument = id_argument
        self._kch_prefix = prefix
        self._kch_model = model
        super().__init__()

    def field(self, *args, **kwargs):
        raise Exception("Please use @object_field instead when using DjangoObjectMutationType.")

    def _get_resolver(self, f):
        """Wraps given resolver function into another function which turns given obj_id into obj."""
        def resolver(_, info, **kwargs):
            obj_id = kwargs.pop(self._kch_id_argument)
            obj = self._kch_model.objects.get(pk=obj_id)
            return f(_, info, obj, **kwargs)

        return resolver

    def object_field(self, name: str):
        def wrapper(f):
            resolver = self._get_resolver(f)
            self.set_field(self._kch_prefix + name, resolver)
            return resolver

        return wrapper

    def create_simple_method_field(self, field_name: str, method_name: str, result_format, result_key=None):
        assert result_format in ('boolean', 'ok', 'obj', 'wrapped_obj')
        assert result_key or result_format != 'wrapped_obj'

        def resolver(_, info, obj):
            getattr(obj, method_name)()
            if result_format == 'boolean':
                # Discouraged. Please use at least `ok` result_format for future extensibility.
                return True
            elif result_format == 'ok':
                # Ok to use for `delete` mutations or for mutations which don't change anything.
                return {'ok': True}
            elif result_format == 'obj':
                # Discouraged. Please use `wrapped_obj` instead for future extensibility.
                return obj
            elif result_format == 'wrapped_obj':
                if not result_key:
                    raise Exception("result_key must be set when result_format is `wrapped_obj`")
                return {result_key: obj}
            else:
                raise Exception(f"Impossible result_format {result_format}")

        self.set_field(self._kch_prefix + field_name, self._get_resolver(resolver))
