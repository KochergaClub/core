from rest_framework.decorators import api_view
from rest_framework.response import Response

from datetime import datetime

from kocherga.error import PublicError
import kocherga.events.booking
from kocherga.api.auth import auth, get_email
from kocherga.api.common import ok

@auth("any")
@api_view()
def r_list_my(request):
    bookings = kocherga.events.booking.bookings_by_email(get_email(request))
    return Response([b.public_object() for b in bookings])


@api_view()
def r_list_by_date(request, date_str):
    if date_str == "today":
        date = datetime.today().date()
    else:
        date = datetime.strptime(date_str, "%Y-%m-%d").date()

    bookings = kocherga.events.booking.day_bookings(date)
    return Response([b.public_object() for b in bookings])


@auth("any")
@api_view(['POST'])
def r_create(request):
    payload = request.data

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

    return Response(ok)


@auth("any")
@api_view(['DELETE'])
def r_delete(request, event_id):
    email = get_email(request)
    kocherga.events.booking.delete_booking(event_id, email)

    return Response(ok)
