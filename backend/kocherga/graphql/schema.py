import logging
logger = logging.getLogger(__name__)

from pathlib import Path
from importlib import import_module

import django.apps
from django.utils.module_loading import module_has_submodule

from ariadne import make_executable_schema, upload_scalar, QueryType, gql
from ariadne.load_schema import read_graphql_file

import kocherga.room

from . import directives


core_type_defs = gql("""
  directive @staffonly on FIELD_DEFINITION
  directive @auth(permission: String, permissions: [String!], authenticated: Boolean) on FIELD_DEFINITION

  scalar Upload

  type Query {
    rooms: [Room]!
    my: My!
  }

  # To be extended by specific backend apps.
  type My {
    _: Boolean
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


Query = QueryType()


# FIXME - move rooms query code somewhere else
@Query.field("rooms")
def resolve_rooms(_, info):
    return [
        kocherga.room.details(room)
        for room in kocherga.room.all_rooms
    ]


@Query.field('my')
def resolve_my(_, info):
    return 'my'


def load_all_types():
    type_defs_list = [Query]
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
    upload_scalar,
    *load_all_types(),
    directives={
        "staffonly": directives.StaffOnlyDirective,
        "auth": directives.AuthDirective,
    }
)
