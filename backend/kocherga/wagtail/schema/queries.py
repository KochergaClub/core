import logging

logger = logging.getLogger(__name__)

from typing import Optional
import urllib.parse

from django.http import Http404
from wagtail.core.models import Page, Site
from wagtail.api.v2.utils import (
    page_models_from_string,
    BadRequestError,
    filter_page_type,
)

from kocherga.graphql import g
from kocherga.graphql.helpers import Collection

from ..utils import filter_queryset_by_page_permissions

from ..models import PagePreview

from . import types


c = Collection()


# Copy-pasted from https://github.com/wagtail/wagtail/blob/master/wagtail/api/v2/endpoints.py
# to allow non-public pages in API.
def get_queryset(request, page_type='wagtailcore.Page'):
    # Allow pages to be filtered to a specific type
    try:
        models = page_models_from_string(page_type)
    except (LookupError, ValueError):
        raise BadRequestError("type doesn't exist")

    if not models:
        models = [Page]

    if len(models) == 1:
        queryset = models[0].objects.all()
    else:
        queryset = Page.objects.all()

        # Filter pages by specified models
        queryset = filter_page_type(queryset, models)

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


queries = c.as_dict()
