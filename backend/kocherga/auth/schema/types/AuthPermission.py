from kocherga.graphql import g

from .AuthUser import AuthUser

# type AuthPermission {
#   id: ID!
#   name: String!
#   users: [AuthUser!]!
# }


def resolve_users(obj, info):
    return obj.user_set.all()


AuthPermission = g.ObjectType(
    'AuthPermission',
    fields={
        'id': g.Field(g.NN(g.ID)),
        'name': g.Field(g.NN(g.String)),
        'users': g.Field(g.NNList(AuthUser), resolve=resolve_users),
    },
)
