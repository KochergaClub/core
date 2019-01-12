from django.views.decorators.http import require_POST, require_safe
from django.http import JsonResponse

from kocherga.api.common import ok
import kocherga.api.auth

@require_POST
def r_google(request):
    token = kocherga.api.auth.google_auth(request)
    return JsonResponse({"jwt_token": token})


@require_safe
@kocherga.api.auth.auth("any")
def r_check(request):
    return JsonResponse(ok)
