from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import user_perm

from .. import registry
from .types import ExternalService

c = helpers.Collection()


@c.class_field
class externalServices(helpers.BaseField):
    def resolve(self, _, info):
        return registry.all_services()

    permissions = [user_perm('external_services.view_access')]
    result = g.NNList(ExternalService)


queries = c.as_dict()


### query ###

# member {
#     externalAccounts {
#         service {
#             slug
#         }
#         ...WikiAccount
#         ...GoogleDriveAccount
#     }
# }
