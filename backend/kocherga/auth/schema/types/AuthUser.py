from kocherga.graphql import g
from kocherga.staff.schema.types import StaffMember

AuthUser = g.ObjectType(
    'AuthUser',
    fields={
        'id': g.Field(g.NN(g.ID)),
        'email': g.Field(g.NN(g.String)),
        'staff_member': g.Field(StaffMember),
    },
)
