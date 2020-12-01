from typing import Optional

from kocherga.external_services import registry as external_services_registry
from kocherga.external_services.schema.types import ExternalServiceAccount
from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import staffonly, user_perm
from kocherga.staff.schema.types import StaffMember


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
    fields=g.fields(
        {
            'id': 'ID!',
            'first_name': str,
            'last_name': str,
            'email': helpers.field_with_permissions(
                g.String, [staffonly], fallback_to_null=True
            ),
            'staff_member': helpers.field_with_permissions(
                StaffMember, [staffonly], fallback_to_null=True
            ),
            'external_accounts': external_accounts_field().as_field(),
        }
    ),
)
