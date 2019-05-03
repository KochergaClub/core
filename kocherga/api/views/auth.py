from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions

from kocherga.api.common import ok
import kocherga.api.auth


@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def r_google(request):
    token = kocherga.api.auth.google_auth(request)
    return Response({"jwt_token": token})


@api_view()
@permission_classes((permissions.IsAuthenticated,))
def r_check(request):
    return Response(ok)
