import logging

logger = logging.getLogger(__name__)

from typing import Optional
import urllib.parse

from django.http import Http404
from wagtail.core.models import Site

from kocherga.graphql import g, helpers

from ..utils import filter_queryset_by_page_permissions

from ..models import PagePreview, KochergaPage

from . import types


c = helpers.Collection()


# Simplified from https://github.com/wagtail/wagtail/blob/master/wagtail/api/v2/endpoints.py
# to allow non-public pages in API.
def get_queryset(request):
    queryset = KochergaPage.objects.all()

    # Get live pages that are not in a private section
    queryset = filter_queryset_by_page_permissions(request, queryset)

    # Get live pages only
    queryset = queryset.live()

    # Filter by site
    site = Site.find_for_request(request)
    if site:
        queryset = queryset.descendant_of(site.root_page, inclusive=True)
    else:
        # No sites configured
        queryset = queryset.none()

    return queryset


@c.field
def wagtailPage(helper):
    def resolve(_, info, path=None, preview_token=None):
        if path and preview_token:
            raise Exception("Only one of `path` and `preview_token` must be set.")

        if path is None and not preview_token:
            raise Exception("One of `path` and `preview_token` must be set.")

        if preview_token:
            page_preview = PagePreview.objects.get(token=preview_token)
            page = page_preview.as_page()
            if not page.id:
                # fake primary key to satisfy GraphQL schema
                page.id = 0
            return page
        else:
            path_components = [
                component
                for component in urllib.parse.unquote(path).split('/')
                if component
            ]

            try:
                site = Site.find_for_request(info.context)
                page, _, _ = site.root_page.specific.route(
                    info.context, path_components
                )
            except Http404:
                return

            # checking permissions (?)
            queryset = get_queryset(info.context)
            if not queryset.filter(id=page.id).exists():
                return

            return page.specific

    # wagtailPage(path: String, preview_token: String): WagtailPage
    return g.Field(
        types.WagtailPage,
        args=g.arguments({'path': Optional[str], 'preview_token': Optional[str]}),
        resolve=resolve,
    )


@c.field
def wagtailPages(helper):
    def resolve(_, info):
        # page.specific is slow! but we call wagtailPages only on getStaticPaths once per build, so that should be ok?..
        return [page.specific for page in get_queryset(info.context)]

    # wagtailPages: [WagtailPage!]!
    return g.Field(g.NNList(types.WagtailPage), resolve=resolve)


# Search is not paged, since combining relay_page with search is non-trivial.
@c.class_field
class wagtailSearch(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        query = input['query']
        qs = get_queryset(info.context).search(query)

        limit = input.pop('limit', None)
        if limit:
            # ask for one more to determine if there are more results
            qs = qs[: limit + 1]

        pages = list(qs)

        more = False
        if limit:
            more = len(pages) > limit
            pages = pages[:limit]

        return {
            'results': [page.specific for page in pages],
            'more': more,
        }

    permissions = []
    input = {
        'query': str,
        'limit': Optional[int],
    }
    result = {
        'results': g.NNList(types.WagtailPage),
        'more': bool,
    }


queries = c.as_dict()
