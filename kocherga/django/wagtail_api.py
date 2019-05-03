from wagtail.api.v2.router import WagtailAPIRouter

from wagtail.api.v2.endpoints import PagesAPIEndpoint
from wagtail.images.api.v2.endpoints import ImagesAPIEndpoint
from wagtail.documents.api.v2.endpoints import DocumentsAPIEndpoint

from rest_framework.permissions import AllowAny

# Create the router. "wagtailapi" is the URL namespace
api_router = WagtailAPIRouter('wagtailapi')


class PagesView(PagesAPIEndpoint):
    permission_classes = (AllowAny,)


class ImagesView(ImagesAPIEndpoint):
    permission_classes = (AllowAny,)


class DocumentsView(DocumentsAPIEndpoint):
    permission_classes = (AllowAny,)


# Add the three endpoints using the "register_endpoint" method.
# The first parameter is the name of the endpoint (eg. pages, images). This
# is used in the URL of the endpoint
# The second parameter is the endpoint class that handles the requests
api_router.register_endpoint('pages', PagesView)
api_router.register_endpoint('images', ImagesView)
api_router.register_endpoint('documents', DocumentsView)
