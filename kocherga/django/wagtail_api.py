import logging
logger = logging.getLogger(__name__)

from django.conf import settings

from rest_framework import permissions

from wagtail.api.v2.router import WagtailAPIRouter

from wagtail.api.v2.endpoints import PagesAPIEndpoint
from wagtail.images.api.v2.endpoints import ImagesAPIEndpoint
from wagtail.documents.api.v2.endpoints import DocumentsAPIEndpoint


# Create the router. "wagtailapi" is the URL namespace
api_router = WagtailAPIRouter('wagtailapi')


class HasWagtailAPIToken(permissions.BasePermission):
    """`X-WagtailAPIToken` is a secret header which is known to only to server.ts.

    It's necessary to avoid leaking hidden pages. In the future we'll need to implement a more sophisticated permission.

    It's not a query param (even though query param would be easier to debug in browser),
    because we use /api/wagtail/pages/find/?html_path redirects which don't keep the query param intact.
    """
    def has_permission(self, request, view):
        return request.META.get('HTTP_X_WAGTAILAPITOKEN', 'unset') == settings.WAGTAIL_API_TOKEN


class PagesView(PagesAPIEndpoint):
    permission_classes = (HasWagtailAPIToken,)


class ImagesView(ImagesAPIEndpoint):
    permission_classes = (HasWagtailAPIToken,)


class DocumentsView(DocumentsAPIEndpoint):
    permission_classes = (HasWagtailAPIToken,)


# Add the three endpoints using the "register_endpoint" method.
# The first parameter is the name of the endpoint (eg. pages, images). This
# is used in the URL of the endpoint
# The second parameter is the endpoint class that handles the requests
api_router.register_endpoint('pages', PagesView)
api_router.register_endpoint('images', ImagesView)
api_router.register_endpoint('documents', DocumentsView)
