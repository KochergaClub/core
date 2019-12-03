import logging
logger = logging.getLogger(__name__)

from django.conf.urls import url
from django.http import Http404

from rest_framework import permissions
from rest_framework.response import Response

from wagtail.api.v2.router import WagtailAPIRouter

import wagtail.api.v2.endpoints
# from wagtail.images.api.v2.endpoints import ImagesAPIEndpoint
# from wagtail.documents.api.v2.endpoints import DocumentsAPIEndpoint

from .models import PagePreview


class PagesAPIEndpoint(wagtail.api.v2.endpoints.PagesAPIEndpoint):
    permission_classes = (permissions.AllowAny,)

    def filter_queryset_by_page_permissions(self, queryset):
        from django.db.models import Q
        from wagtail.core.models import PageViewRestriction

        q = Q()
        for restriction in PageViewRestriction.objects.all():
            if restriction.accept_request(self.request):
                continue
            q &= ~queryset.descendant_of_q(restriction.page, inclusive=True)

        return queryset.filter(q)

    # Copy-pasted from https://github.com/wagtail/wagtail/blob/master/wagtail/api/v2/endpoints.py
    # to allow non-public pages in API.
    def get_queryset(self):
        request = self.request

        from wagtail.api.v2.utils import page_models_from_string, BadRequestError, filter_page_type
        from wagtail.core.models import Page

        # Allow pages to be filtered to a specific type
        try:
            models = page_models_from_string(request.GET.get('type', 'wagtailcore.Page'))
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
        queryset = self.filter_queryset_by_page_permissions(queryset)

        # Get live pages only
        queryset = queryset.live()

        # Filter by site
        if request.site:
            queryset = queryset.descendant_of(request.site.root_page, inclusive=True)
        else:
            # No sites configured
            queryset = queryset.none()

        return queryset

    def locate_view(self, request):
        """Similar to Wagtail's native /api/v2/pages/find, but returns JSON instead of HTTP redirect."""
        queryset = self.get_queryset()

        try:
            obj = self.find_object(queryset, request)

            if obj is None:
                raise self.model.DoesNotExist

        except self.model.DoesNotExist:
            raise Http404("not found")

        return Response({'id': obj.pk})

    @classmethod
    def get_urlpatterns(cls):
        return super().get_urlpatterns() + [
            url(r'^locate/$', cls.as_view({'get': 'locate_view'}), name='locate'),
        ]

# class ImagesView(ImagesAPIEndpoint):
#     permission_classes = (HasWagtailAPIToken,)
#
# class DocumentsView(DocumentsAPIEndpoint):
#     permission_classes = (HasWagtailAPIToken,)


class PagePreviewAPIEndpoint(PagesAPIEndpoint):
    known_query_parameters = PagesAPIEndpoint.known_query_parameters.union(['token'])

    def listing_view(self, request):
        raise Exception("Not implemented")

    def detail_view(self, request, pk):
        raise Exception("Not implemented")

    def find_view(self, request):
        page = self.get_object()
        serializer = self.get_serializer(page)
        return Response(serializer.data)

    def get_object(self):
        token = self.request.GET['token']
        page_preview = PagePreview.objects.get(token=token)
        page = page_preview.as_page()
        if not page.pk:
            # fake primary key to stop API URL routing from complaining
            page.pk = 0

        return page


# Create the router. "wagtailapi" is the URL namespace
api_router = WagtailAPIRouter('wagtailapi')

# Add the three endpoints using the "register_endpoint" method.
# The first parameter is the name of the endpoint (eg. pages, images). This
# is used in the URL of the endpoint
# The second parameter is the endpoint class that handles the requests

api_router.register_endpoint('pages', PagesAPIEndpoint)

api_router.register_endpoint('page_preview', PagePreviewAPIEndpoint)

# api_router.register_endpoint('images', ImagesView)
# api_router.register_endpoint('documents', DocumentsView)
