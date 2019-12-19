# via https://gist.github.com/twidi/9d55486c36b6a51bdcb05ce3a763e79f

from django.core.exceptions import ValidationError as DjangoValidationError

from rest_framework.exceptions import ValidationError as DRFValidationError, NotFound
from rest_framework.views import exception_handler as drf_exception_handler
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework import filters


def exception_handler(exc, context):
    """Handle Django ValidationError as an accepted exception."""

    if isinstance(exc, DjangoValidationError):
        exc = DRFValidationError(detail=exc.messages)

    return drf_exception_handler(exc, context)


@api_view()
@permission_classes((AllowAny,))
def view404(request):
    raise NotFound()


class BulkRetrieveFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):
        ids_str = request.query_params.get('ids')
        if not ids_str:
            return queryset
        ids = [int(s) for s in ids_str.split(',')]

        return queryset.filter(pk__in=ids)
