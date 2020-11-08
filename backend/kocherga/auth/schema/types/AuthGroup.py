from graphql import GraphQLObjectType
from kocherga.graphql import g

from .AuthPermission import AuthPermission
from .AuthUser import AuthUser

AuthGroup = GraphQLObjectType(
    name='AuthGroup',
    fields=g.fields(
        {
            'id': 'ID!',
            'name': str,
            'permissions': g.Field(
                g.NNList(AuthPermission),
                resolve=lambda obj, info: obj.permissions.all(),
            ),
            'users': g.Field(
                g.NNList(AuthUser), resolve=lambda obj, info: obj.user_set.all()
            ),
        }
    ),
)
