from kocherga.graphql import g

# type AuthCurrentUser {
#   is_authenticated: Boolean!
#   email: String
#   first_name: String
#   last_name: String
#   is_staff: Boolean
#   permissions: [String!]!
# }


def resolve_permissions(obj, info):
    return info.context.user.get_all_permissions()


AuthCurrentUser = g.ObjectType(
    'AuthCurrentUser',
    fields={
        'is_authenticated': g.Field(g.NN(g.Boolean)),
        'email': g.Field(g.String),
        'first_name': g.Field(g.String),
        'last_name': g.Field(g.String),
        'is_staff': g.Field(g.Boolean),
        'permissions': g.Field(g.NNList(g.String), resolve=resolve_permissions),
    },
    description="""Describes the current user.

If user is not signed in, `is_authenticated` field will be false and all other fields will be empty.""",
)
