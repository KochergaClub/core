# via https://gist.github.com/twidi/9d55486c36b6a51bdcb05ce3a763e79f

from django.core.exceptions import ValidationError as DjangoValidationError

from rest_framework.exceptions import ValidationError as DRFValidationError, NotFound
from rest_framework.views import exception_handler as drf_exception_handler
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny


def exception_handler(exc, context):
    """Handle Django ValidationError as an accepted exception."""

    if isinstance(exc, DjangoValidationError):
        exc = DRFValidationError(detail=exc.message_dict)

    return drf_exception_handler(exc, context)


@api_view()
@permission_classes((AllowAny,))
def view404(request):
    raise NotFound()
