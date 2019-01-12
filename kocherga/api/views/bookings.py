from django.http import JsonResponse
from django.views.decorators.http import require_safe, require_POST, require_http_methods

import json
from datetime import datetime

from kocherga.error import PublicError
import kocherga.events.booking
from kocherga.api.auth import auth, get_email
from kocherga.api.common import ok

@auth("any")
@require_safe
def r_list_my(request):
    bookings = kocherga.events.booking.bookings_by_email(get_email(request))
    return JsonResponse([b.public_object() for b in bookings], safe=False)


@require_safe
def r_list_by_date(request, date_str):
    if date_str == "today":
        date = datetime.today().date()
    else:
        date = datetime.strptime(date_str, "%Y-%m-%d").date()

    bookings = kocherga.events.booking.day_bookings(date)
    return JsonResponse([b.public_object() for b in bookings], safe=False)


@require_POST
@auth("any")
def r_create(request):
    payload = json.loads(request.body)

    data={}
    for field in ("date", "room", "people", "startTime", "endTime"):
        if field not in payload:
            raise PublicError("field {} is required".format(field))
        data[field] = str(payload.get(field, ""))

    kocherga.events.booking.add_booking(
        date=data['date'],
        room=data['room'],
        people=data['people'],
        start_time=data['startTime'],
        end_time=data['endTime'],
        email=get_email(request),
    )

    return JsonResponse(ok)


@require_http_methods(["DELETE"])
@auth("any")
def r_delete(request, event_id):
    email = get_email(request)
    kocherga.events.booking.delete_booking(event_id, email)

    return jsonify(ok)
