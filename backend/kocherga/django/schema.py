import logging
logger = logging.getLogger(__name__)

from pathlib import Path
from importlib import import_module

import django.apps
from django.utils.module_loading import module_has_submodule

from ariadne import make_executable_schema, QueryType, gql
from ariadne.load_schema import read_graphql_file

import kocherga.room

import kocherga.auth.schema


core_type_defs = gql("""
  type Query {
    rooms: [Room]!
  }

  type Room {
    name: String
    max_people: Int
    area: Int
  }

  type Mutation {
    _empty: Boolean
  }

  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }

""")


def load_all_typedefs():
    type_defs_list = [core_type_defs]
    for app in django.apps.apps.get_app_configs():
        schema_path = Path(app.path) / 'schema.graphql'
        if not schema_path.is_file():
            continue
        logger.debug(f"Found {schema_path}")
        app_type_defs = read_graphql_file(schema_path)
        type_defs_list.append(app_type_defs)
    return '\n'.join(type_defs_list)


# FIXME - move rooms query code somewhere else
query = QueryType()


@query.field("rooms")
def resolve_rooms(_, info):
    return [
        kocherga.room.details(room)
        for room in kocherga.room.all_rooms
    ]


def load_all_types():
    type_defs_list = [query]
    # based on django.apps.config.import_models
    for app in django.apps.apps.get_app_configs():
        SCHEMA_MODULE_NAME = 'schema'
        if not module_has_submodule(app.module, SCHEMA_MODULE_NAME):
            continue
        logger.debug(f"Found schema for app {app.name}")
        schema_module = import_module(f'{app.name}.{SCHEMA_MODULE_NAME}')
        type_defs_list.extend(schema_module.types)
    return type_defs_list


schema = make_executable_schema(
    load_all_typedefs(),
    *load_all_types()
)

# TODO:
# kocherga.cm2.schema
