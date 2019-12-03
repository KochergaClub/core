from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from datetime import datetime

from kocherga.error import PublicError
import kocherga.events.booking
from kocherga.api.common import ok


@api_view()
@permission_classes((IsAuthenticated,))
def r_list_my(request):
    email = request.user.email
    bookings = kocherga.events.booking.bookings_by_email(email)
    return Response([b.public_object() for b in bookings])


@api_view()
@permission_classes((AllowAny,))
def r_list_by_date(request, date_str):
    if date_str == "today":
        date = datetime.today().date()
    else:
        date = datetime.strptime(date_str, "%Y-%m-%d").date()

    bookings = kocherga.events.booking.day_bookings(date)
    return Response([b.public_object() for b in bookings])


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def r_create(request):
    email = request.user.email
    payload = request.data

    data = {}
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
        email=email,
    )

    return Response(ok)


@api_view(['DELETE'])
@permission_classes((IsAuthenticated,))
def r_delete(request, event_uuid):
    email = request.user.email
    kocherga.events.booking.delete_booking(event_uuid, email)

    return Response(ok)
