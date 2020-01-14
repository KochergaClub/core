from ariadne import QueryType, InterfaceType

from django.http import Http404
from wagtail.core.models import Page
from wagtail.api.v2.utils import page_models_from_string, BadRequestError, filter_page_type

from ..utils import filter_queryset_by_page_permissions


Query = QueryType()


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
    if request.site:
        queryset = queryset.descendant_of(request.site.root_page, inclusive=True)
    else:
        # No sites configured
        queryset = queryset.none()

    return queryset


@Query.field('wagtailPage')
def resolve_wagtailPage(_, info, path):
    path_components = [component for component in path.split('/') if component]

    try:
        page, _, _ = info.context.site.root_page.specific.route(info.context, path_components)
    except Http404:
        return

    queryset = get_queryset(info.context)
    if queryset.filter(id=page.id).exists():
        return page.specific


WagtailPage = InterfaceType("WagtailPage")


@WagtailPage.type_resolver
def resolve_WagtailPage_type(page, *_):
    # Each wagtail page model should provide graphql_type str property.
    return page.specific_class.graphql_type


@WagtailPage.field("meta")
def resolve_WagtailPage_meta(page, info):
    return {
        'slug': page.slug,
        'html_url': page.url,
    }


WagtailBlock = InterfaceType("WagtailBlock")


@WagtailBlock.type_resolver
def resolve_WagtailBlock_type(obj, *_):
    # Naming type by convention.
    # Example: type='grey' -> GreyWagtailBlock
    camel_name = ''.join([
        part.capitalize() for part in obj.block.name.split('_')
    ])
    return camel_name + 'Block'


types = [Query, WagtailPage, WagtailBlock]
