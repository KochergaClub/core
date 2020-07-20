from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import user_perm
from kocherga.staff.schema.types import StaffMember

from kocherga.external_services.schema.types import ExternalServiceAccount
from kocherga.external_services import registry as external_services_registry


class external_accounts_field(helpers.BaseField):
    def resolve(self, obj, info):
        services = external_services_registry.all_services()

        result = []
        for s in services:
            account = s.user_account(obj)
            if account:
                result.append(account)

        return result

    permissions = [user_perm('external_services.view_access')]

    result = g.NNList(ExternalServiceAccount)


AuthUser = g.ObjectType(
    'AuthUser',
    fields={
        'id': g.Field(g.NN(g.ID)),
        'email': g.Field(g.NN(g.String)),
        'staff_member': g.Field(StaffMember),
        'external_accounts': external_accounts_field().as_field(),
    },
)
