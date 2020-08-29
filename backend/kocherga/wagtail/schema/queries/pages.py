import logging

logger = logging.getLogger(__name__)

from kocherga.wagtail.utils import get_page_queryset_for_request

from typing import Optional
import urllib.parse

from django.http import Http404
from wagtail.core.models import Site

from kocherga.graphql import g, helpers

from ...models import PagePreview

from .. import types


c = helpers.Collection()


@c.class_field
class wagtailPage(helpers.BaseField):
    def resolve(self, _, info, path=None, preview_token=None):
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

            # checking permissions
            queryset = get_page_queryset_for_request(info.context)
            if not queryset.filter(id=page.id).exists():
                return

            return page.specific

    permissions = []
    args = {
        'path': Optional[str],
        'preview_token': Optional[str],
    }
    result = types.WagtailPage


@c.field
def wagtailPages(helper):
    def resolve(_, info):
        # page.specific is slow!
        # But we call wagtailPages only on getStaticPaths once per build, so that should be ok.
        return [page.specific for page in get_page_queryset_for_request(info.context)]

    # wagtailPages: [WagtailPage!]!
    return g.Field(g.NNList(types.WagtailPage), resolve=resolve)


queries = c.as_dict()
