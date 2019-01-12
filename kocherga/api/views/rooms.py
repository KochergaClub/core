from django.http import JsonResponse
from django.views.decorators.http import require_safe

import kocherga.room

@require_safe
def r_rooms(request):
    return JsonResponse([kocherga.room.details(room) for room in kocherga.room.all_rooms], safe=False)
