from typing import Optional

from kocherga.django.managers import PageInfo, RelayConnection
from kocherga.graphql import g, helpers
from wagtail.search.backends import get_search_backend

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
            if filter.get('curated_by_empty'):
                qs = qs.filter(curated_by__isnull=True)

        if filter and filter.get('search'):
            s = get_search_backend()
            nodes = list(s.search(filter['search'], qs))
            return RelayConnection(
                pageInfo=PageInfo(
                    hasPreviousPage=False,
                    hasNextPage=False,
                    startCursor='search',
                    endCursor='search',
                ),
                nodes=nodes,
                edges=[{'node': node} for node in nodes],
            )

        return qs.relay_page(**pager)

    permissions = [permissions.manage_crm]

    FilterInput = g.InputObjectType(
        'CommunityLeadsFilterInput',
        g.input_fields(
            {
                'status': types.CommunityLeadStatus,
                'curated_by_me': Optional[bool],
                'curated_by_empty': Optional[bool],
                'search': Optional[str],
            }
        ),
    )
    args = {**helpers.connection_args(), 'filter': FilterInput}
    result = g.NN(types.CommunityLeadConnection)


queries = c.as_dict()
