from kocherga.graphql.decorators import staffonly
from kocherga.graphql import g

from kocherga.auth.schema import types as auth_types
from kocherga.slack.schema import types as slack_types


@staffonly
def resolve_user(obj, info):
    return obj.user


@staffonly
def resolve_slack_user(obj, info):
    return obj.slack_user


# type StaffMember {
#   id: ID!
#   short_name: String!
#   full_name: String!
#   role: String!
#   is_current: Boolean!
#   vk: String!
#   color: String!
#   user: AuthUser!
#   slack_user: SlackUser
# }

StaffMember = g.ObjectType(
    'StaffMember',
    fields=lambda: g.fields(
        {
            'id': 'ID!',
            'short_name': str,
            'full_name': str,
            'role': str,
            'is_current': bool,
            'vk': str,
            'color': str,
            'user': g.Field(g.NN(auth_types.AuthUser), resolve=resolve_user),
            'slack_user': g.Field(slack_types.SlackUser, resolve=resolve_slack_user),
        }
    ),
)
