from kocherga.graphql import g

from ...utils import permission_to_perm
from .AuthUser import AuthUser


def resolve_users(obj, info):
    return obj.user_set.all()


AuthPermission = g.ObjectType(
    'AuthPermission',
    fields={
        'id': g.Field(g.NN(g.ID)),
        'name': g.Field(g.NN(g.String)),
        'perm': g.Field(g.NN(g.String), resolve=lambda obj, _: permission_to_perm(obj)),
        'users': g.Field(g.NNList(AuthUser), resolve=resolve_users),
    },
)
