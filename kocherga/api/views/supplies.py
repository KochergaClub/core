from django.views.decorators.http import require_POST
from django.http import JsonResponse

import json

from kocherga.api.common import ok

from kocherga.supplies.models import CookiePick

@require_POST
def r_pick_cookie(request):
    payload = json.loads(request.body)

    pick = CookiePick(
        cookie_id=payload['cookie'],
        against_id=payload['against'],
        position=payload['position'],
        user=payload['user'],
        time=payload['time'],
    )
    pick.save()

    return JsonResponse(ok)

@require_POST
def r_pick_neither_cookie(request):
    payload = json.loads(request.body)

    for key in ['c1', 'c2']:
        pick = CookiePick(
            cookie_id='',
            against_id=payload[key],
            position=-1,
            user=payload['user'],
            time=payload['time'],
        )
        pick.save()

    return JsonResponse(ok)
