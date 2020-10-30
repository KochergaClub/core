import logging

logger = logging.getLogger(__name__)

from kocherga.wagtail.utils import get_page_queryset_for_request

from typing import Optional
import urllib.parse

from django.http import Http404
from wagtail.core.models import Site

from kocherga.graphql import g, helpers

from ...models import PagePreview, KochergaPage

from .. import types


c = helpers.Collection()


class PrivatePage:
    pass


class WagtailPageContainer:
    def __init__(self, page):
        self.page = page


class WagtailPageMixin:
    def resolve(self, _, info, path=None, preview_token=None, page_id=None):
        non_empty_args = len(
            [x for x in (path, preview_token, page_id) if x is not None]
        )
        if non_empty_args != 1:
            raise Exception(
                "One and only one of `page_id`, `path` and `preview_token` must be set."
            )

        if preview_token is not None:
            page_preview = PagePreview.objects.get(token=preview_token)
            page = page_preview.as_page()
            if not page.id:
                # fake primary key to satisfy GraphQL schema
                page.id = 0
            return WagtailPageContainer(page)
        elif path is not None:
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
                return WagtailPageContainer(None)
        elif page_id is not None:
            page = KochergaPage.objects.get(pk=page_id)
        else:
            raise Exception("Internal logic error")

        # checking permissions
        queryset = get_page_queryset_for_request(info.context)
        if not queryset.filter(id=page.id).exists():
            return PrivatePage()

        return WagtailPageContainer(page.specific)


# deprecated - use wagtailPageOrPrivate instead
@c.class_field
class wagtailPage(WagtailPageMixin, helpers.BaseField):
    def resolve(self, *args, **kwargs):
        result = super().resolve(*args, **kwargs)
        if isinstance(result, PrivatePage):
            return
        if isinstance(result, WagtailPageContainer):
            return result.page

        # WagtailPageMixin.resolve must return either PrivatePage or WagtailPageContainer
        raise Exception("Internal logic error")

    permissions = []
    args = {
        'page_id': 'ID',
        'path': Optional[str],
        'preview_token': Optional[str],
    }
    result = types.WagtailPage


WagtailPageContainerType = g.ObjectType(
    'WagtailPageContainer',
    fields=g.fields(
        {
            'page': types.WagtailPage,  # yes, nullable
        }
    ),
)

WagtailPagePrivateType = g.ObjectType(
    'WagtailPagePrivate',
    fields=g.fields(
        {'message': g.Field(g.NN(g.String), resolve=lambda obj, info: 'private')}
    ),
)

# wagtailPageOrPrivate(...) {
#     ... on WagtailPageContainer {
#         ...
#     }
#     ... on WagtailPagePrivate {
#         message
#         ...
#     }
# }
@c.class_field
class wagtailPageOrPrivate(
    WagtailPageMixin, helpers.UnionFieldMixin, helpers.BaseField
):
    permissions = []
    args = {
        'page_id': 'ID',
        'path': Optional[str],
        'preview_token': Optional[str],
    }

    result_types = {
        WagtailPageContainer: WagtailPageContainerType,
        PrivatePage: WagtailPagePrivateType,
    }


@c.field
def wagtailPages(helper):
    def resolve(_, info):
        # page.specific is slow!
        # But we call wagtailPages only on getStaticPaths once per build, so that should be ok.
        return [page.specific for page in get_page_queryset_for_request(info.context)]

    return g.Field(g.NNList(types.WagtailPage), resolve=resolve)


queries = c.as_dict()
