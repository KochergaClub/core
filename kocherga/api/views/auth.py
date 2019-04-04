from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from kocherga.api.common import ok
import kocherga.api.auth


@api_view(['POST'])
def r_google(request):
    token = kocherga.api.auth.google_auth(request)
    return Response({"jwt_token": token})


@permission_classes(IsAuthenticated,)
@api_view()
def r_check(request):
    return Response(ok)
