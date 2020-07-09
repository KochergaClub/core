import logging

logger = logging.getLogger(__name__)

from importlib import import_module
from typing import Any

import django.apps
from django.utils.module_loading import module_has_submodule

import graphql
from . import g, helpers


_schema_modules = []


def get_schema_modules():
    if len(_schema_modules):
        return _schema_modules

    # based on django.apps.config.import_models
    for app in django.apps.apps.get_app_configs():
        SCHEMA_MODULE_NAME = 'schema'
        if not module_has_submodule(app.module, SCHEMA_MODULE_NAME):
            continue
        logger.debug(f"Found schema for app {app.name}")
        schema_module: Any = import_module(f'{app.name}.{SCHEMA_MODULE_NAME}')
        _schema_modules.append(schema_module)
    return _schema_modules


def object_from_modules(attr):
    result = helpers.merge_field_dicts(
        [
            getattr(schema_module, attr)
            for schema_module in get_schema_modules()
            if hasattr(schema_module, attr)
        ]
    )

    if not result:
        result = {'_blank': g.Field(g.Boolean)}
    return result


def load_queries():
    my_queries = object_from_modules('my_queries')
    queries = object_from_modules('queries')

    if 'my' in queries:
        raise Exception("Some schema module defined `my` query, that's forbidden")

    queries['my'] = g.Field(
        g.NN(g.ObjectType('My', my_queries)), resolve=lambda obj, info: 'my'
    )

    return g.ObjectType(name='Query', fields=queries)


def load_mutations():
    mutations = object_from_modules('mutations')

    return g.ObjectType(name='Mutation', fields=mutations)


# For extra types only which are unreachable from query and mutation types,
# e.g. for WagtailPage interface implementations.
def load_types():
    types = []
    for schema_module in get_schema_modules():
        if not hasattr(schema_module, 'exported_types'):
            continue
        if not isinstance(schema_module.exported_types, list):
            raise Exception(f"Expected list for {schema_module}.exported_types")
        types.extend(schema_module.exported_types)

    return types


def load_subscriptions():
    subscriptions = object_from_modules('subscriptions')

    return g.ObjectType(name='Subscription', fields=subscriptions)


schema = graphql.GraphQLSchema(
    query=load_queries(),
    mutation=load_mutations(),
    subscription=load_subscriptions(),
    types=load_types(),
)
