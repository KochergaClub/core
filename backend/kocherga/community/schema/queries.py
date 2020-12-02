from kocherga.graphql import g, helpers

from .. import models, permissions
from . import types

c = helpers.Collection()


@c.class_field
class communityLeads(helpers.BaseField):
    def resolve(self, _, info, filter=None, **pager):
        qs = models.Lead.objects.all()
        if filter:
            if 'status' in filter:
                qs = qs.filter(status=filter['status'])
        return qs.relay_page(**pager)

    permissions = [permissions.manage_crm]

    FilterInput = g.InputObjectType(
        'CommunityLeadsFilterInput',
        g.input_fields(
            {
                'status': types.CommunityLeadStatus,
            }
        ),
    )
    args = {**helpers.connection_args(), 'filter': FilterInput}
    result = g.NN(types.CommunityLeadConnection)


queries = c.as_dict()
