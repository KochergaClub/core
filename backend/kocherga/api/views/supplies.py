from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

from kocherga.api.common import ok

from kocherga.supplies.models import CookiePick


@api_view(['POST'])
@permission_classes((AllowAny,))
def r_pick_cookie(request):
    payload = request.data

    pick = CookiePick(
        cookie_id=payload['cookie'],
        against_id=payload['against'],
        position=payload['position'],
        user=payload['user'],
        time=payload['time'],
    )
    pick.save()

    return Response(ok)


@api_view(['POST'])
@permission_classes((AllowAny,))
def r_pick_neither_cookie(request):
    payload = request.data

    for key in ['c1', 'c2']:
        pick = CookiePick(
            cookie_id='',
            against_id=payload[key],
            position=-1,
            user=payload['user'],
            time=payload['time'],
        )
        pick.save()

    return Response(ok)
