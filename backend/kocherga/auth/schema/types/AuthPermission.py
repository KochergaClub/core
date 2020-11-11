from kocherga.graphql import g

from .AuthUser import AuthUser


def resolve_users(obj, info):
    return obj.user_set.all()


def resolve_as_string(obj, info):
    return f"{obj.content_type.app_label}.{obj.codename}"


AuthPermission = g.ObjectType(
    'AuthPermission',
    fields={
        'id': g.Field(g.NN(g.ID)),
        'name': g.Field(g.NN(g.String)),
        'as_string': g.Field(g.NN(g.String), resolve=resolve_as_string),
        'users': g.Field(g.NNList(AuthUser), resolve=resolve_users),
    },
)
