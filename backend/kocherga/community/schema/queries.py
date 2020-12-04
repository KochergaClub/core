from typing import Optional

from kocherga.graphql import g, helpers

from .. import models, permissions
from . import types

c = helpers.Collection()


@c.class_field
class communityLeads(helpers.BaseField):
    def resolve(self, _, info, filter=None, **pager):
        qs = models.Lead.objects.all()
        if filter:
            if filter.get('status'):
                qs = qs.filter(status=filter['status'])
            if filter.get('curated_by_me'):
                qs = qs.filter(curated_by=info.context.user)
        return qs.relay_page(**pager)

    permissions = [permissions.manage_crm]

    FilterInput = g.InputObjectType(
        'CommunityLeadsFilterInput',
        g.input_fields(
            {
                'status': types.CommunityLeadStatus,
                'curated_by_me': Optional[bool],
            }
        ),
    )
    args = {**helpers.connection_args(), 'filter': FilterInput}
    result = g.NN(types.CommunityLeadConnection)


queries = c.as_dict()
