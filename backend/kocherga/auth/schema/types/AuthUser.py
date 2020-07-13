from kocherga.graphql import g
from kocherga.staff.schema.types import StaffMember

# type AuthUser {
#   id: ID!
#   email: String!
#   staff_member: StaffMember
# }


def resolve_staff_member(obj, info):
    return obj.staff_member  # TODO - dataloader


AuthUser = g.ObjectType(
    'AuthUser',
    fields={
        'id': g.Field(g.NN(g.ID)),
        'email': g.Field(g.NN(g.String)),
        'staff_member': g.Field(StaffMember, resolve=resolve_staff_member),
    },
)
