from rest_framework.response import Response
from rest_framework.decorators import api_view

from kocherga.api.common import ok
import kocherga.api.auth


@api_view(['POST'])
def r_google(request):
    token = kocherga.api.auth.google_auth(request)
    return Response({"jwt_token": token})


@kocherga.api.auth.auth("any")
@api_view()
def r_check(request):
    return Response(ok)
