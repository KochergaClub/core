from ariadne import QueryType

from .. import models

Query = QueryType()

@Query.field('events')
def resolve_events(self, info, search, **pager):
    qs = models.Event.objects.list_events()
    if search:
        qs = qs.filter(title__icontains=search)
    return qs.relay_page(**pager)
