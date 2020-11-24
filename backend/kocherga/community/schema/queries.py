from kocherga.graphql import g, helpers

from . import types
from .. import models, permissions

c = helpers.Collection()


@c.class_field
class communityLeads(helpers.BaseField):
    def resolve(self, _, info, **pager):
        return models.Lead.objects.relay_page(**pager)

    permissions = [permissions.manage_crm]
    args = helpers.connection_args()
    result = g.NN(types.CommunityLeadConnection)


queries = c.as_dict()
