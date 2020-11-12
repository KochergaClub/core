from typing import Optional

from kocherga.graphql import g


def resolve_permissions(obj, info):
    return info.context.user.get_all_permissions()


def id_field():
    def resolve(obj, info):
        return getattr(obj, 'email', None) or 'anonymous'

    return g.Field(g.NN(g.ID), resolve=resolve)


AuthCurrentUser = g.ObjectType(
    'AuthCurrentUser',
    fields=g.fields(
        {
            'id': id_field(),
            'is_authenticated': bool,
            'email': Optional[str],
            'first_name': Optional[str],
            'last_name': Optional[str],
            'is_staff': Optional[bool],
            'is_superuser': bool,
            'permissions': g.Field(g.NNList(g.String), resolve=resolve_permissions),
        }
    ),
    description="""Describes the current user.

If user is not signed in, `is_authenticated` field will be false and all other fields will be empty.""",
)
