from datetime import datetime, timedelta
from typing import Optional

from wagtail.search.backends import get_search_backend

from kocherga.graphql import g, helpers

from kocherga.dateutils import TZ
from kocherga.wagtail.utils import get_page_queryset_for_request

from .. import types

c = helpers.Collection()

PageSearchItem = g.ObjectType(
    'PageSearchItem', g.fields({'page': g.NN(types.WagtailPage)})
)


# defer imports
def EventSearchItem_fields():
    import kocherga.events.schema.types

    return g.fields({'event': g.NN(kocherga.events.schema.types.Event)})


EventSearchItem = g.ObjectType(
    'EventSearchItem', lambda: g.fields(EventSearchItem_fields())
)


# {'page': KochergaPage}
# or {'event': KochergaEvent}
def resolve_SearchItem_type(value, *_):
    if 'page' in value:
        return PageSearchItem
    elif 'event' in value:
        return EventSearchItem
    else:
        raise Exception(f"Unknown value {value}")


# not SearchResult because it's already taken as generated return type of search() query field
SearchItem = g.UnionType(
    'SearchItem',
    types=[PageSearchItem, EventSearchItem],
    resolve_type=resolve_SearchItem_type,
)


# Search is not paged, since combining relay_page with search is non-trivial.
@c.class_field
class search(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        query = input['query']
        if not query:
            # don't want to find anything by an empty query
            return {
                'results': [],
                'more': False,
            }

        results = []

        import kocherga.events.models

        events = get_search_backend().search(
            query,
            kocherga.events.models.Event.objects.public_events(
                from_date=datetime.now(tz=TZ) - timedelta(days=2)
            ),
        )[:2]

        results.extend([{'event': event} for event in events])

        qs = get_page_queryset_for_request(info.context).search(query)

        limit = input.pop('limit', None)
        if limit:
            # ask for one more to determine if there are more results
            qs = qs[: limit + 1]

        pages = list(qs)

        more = False
        if limit:
            more = len(pages) > limit
            pages = pages[:limit]

        results.extend([{'page': page.specific} for page in pages])

        return {
            'results': results,
            'more': more,
        }

    permissions = []
    input = {
        'query': str,
        'limit': Optional[int],
    }
    result = {
        'results': g.NNList(SearchItem),
        'more': bool,
    }


queries = c.as_dict()
