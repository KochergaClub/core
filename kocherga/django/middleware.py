import logging
logger = logging.getLogger(__name__)

import traceback

from django.http import JsonResponse, HttpResponse
from kocherga.error import PublicError

class JsonExceptionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        return self.get_response(request)

    def process_exception(self, request, exception):
        if not request.path_info.startswith('/api/'):
            return

        logger.error(traceback.format_exc())

        if isinstance(exception, PublicError):
            return JsonResponse(exception.to_dict(), status=exception.status_code)
        else:
            return JsonResponse({"error": "Internal error"}, status=500)


class CorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not request.path_info.startswith('/api/'):
            return self.get_response(request)

        if request.method == "OPTIONS":
            response = HttpResponse()
            response["Access-Control-Allow-Methods"] = "DELETE, GET, POST, PUT, PATCH"
            headers = request.META.get("HTTP_ACCESS_CONTROL_REQUEST_HEADERS")
            if headers:
                response["Access-Control-Allow-Headers"] = headers
        else:
            response = self.get_response(request)

        response["Access-Control-Allow-Origin"] = "*"
        return response
