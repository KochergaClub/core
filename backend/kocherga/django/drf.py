# via https://gist.github.com/twidi/9d55486c36b6a51bdcb05ce3a763e79f

from django.core.exceptions import ValidationError as DjangoValidationError
from django.db.models import Manager

from rest_framework.exceptions import ValidationError as DRFValidationError, NotFound
from rest_framework.views import exception_handler as drf_exception_handler
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny
from rest_framework import response


def exception_handler(exc, context):
    """Handle Django ValidationError as an accepted exception."""

    if isinstance(exc, DjangoValidationError):
        exc = DRFValidationError(detail=exc.messages)

    return drf_exception_handler(exc, context)


@api_view()
@permission_classes((AllowAny,))
def view404(request):
    raise NotFound()


class BulkRetrieveMixin:
    @action(detail=False)
    def bulk(self: Manager, request):
        ids_str = request.query_params.get('ids')
        if not ids_str:
            raise Exception("Expected ids query param")

        ids = [int(s) for s in ids_str.split(',')]
        if len(ids) > 100:
            raise Exception("Only 100 items per bulk operation are allowed")

        queryset = self.get_queryset().filter(pk__in=ids)
        serializer = self.get_serializer(queryset, many=True)
        return response.Response(serializer.data)
