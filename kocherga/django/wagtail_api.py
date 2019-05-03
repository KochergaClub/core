from wagtail.api.v2.router import WagtailAPIRouter
from wagtail.api.v2 import endpoints
from rest_framework.permissions import AllowAny

# Create the router. "wagtailapi" is the URL namespace
api_router = WagtailAPIRouter('wagtailapi')


class PagesAPIEndpoint(endpoints.PagesAPIEndpoint):
    permission_classes = (AllowAny,)


class ImagesAPIEndpoint(endpoints.ImagesAPIEndpoint):
    permission_classes = (AllowAny,)


class DocumentsAPIEndpoint(endpoints.DocumentsAPIEndpoint):
    permission_classes = (AllowAny,)


# Add the three endpoints using the "register_endpoint" method.
# The first parameter is the name of the endpoint (eg. pages, images). This
# is used in the URL of the endpoint
# The second parameter is the endpoint class that handles the requests
api_router.register_endpoint('pages', PagesAPIEndpoint)
api_router.register_endpoint('images', ImagesAPIEndpoint)
api_router.register_endpoint('documents', DocumentsAPIEndpoint)
