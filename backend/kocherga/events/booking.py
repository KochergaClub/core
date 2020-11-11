import logging

logger = logging.getLogger(__name__)

import datetime
import re

import kocherga.events.helpers
import kocherga.room
from kocherga.dateutils import TZ, dts
from kocherga.error import PublicError
from kocherga.events.models import Event

# types:
# room (unicode, lowercase)
# pretty room (unicode, capitalized)
# booking (all params)
# booking.public (start, end, pretty room)

MAX_BOOKING_DELAY = datetime.timedelta(days=60)


class Booking:
    def __init__(self, start_dt, end_dt, room, people, event_uuid=None):
        self.start_dt = start_dt
        self.end_dt = end_dt
        kocherga.room.validate(room)
        self.room = room
        self.people = people
        self.event_uuid = event_uuid

    @classmethod
    def from_event(cls, event):
        match = re.match(r"Бронь \w+, (\d+) человек", event.title)
        people = None
        if match:
            people = match.group(1)
        return Booking(event.start, event.end, event.get_room(), people, event.uuid)

    def public_object(self):
        return {
            "start": dts(self.start_dt),
            "end": dts(self.end_dt),
            "room": kocherga.room.pretty(self.room),
            "people": self.people,
            "event_id": self.event_uuid,
        }


def day_bookings(date):
    events = Event.objects.filter_by_date(date=date)

    bookings = [Booking.from_event(event) for event in events]

    return bookings


def check_availability(start_dt, end_dt, room):
    if not (
        start_dt.date() == end_dt.date()
        or (
            start_dt.date() + datetime.timedelta(days=1) == end_dt.date()
            and end_dt.time() == datetime.time(0, 0)
        )
    ):
        raise PublicError("Starting date and ending date should be equal.")

    room = kocherga.room.normalize(room, fail=True)

    date = start_dt.date()

    bookings = day_bookings(date)
    logger.debug(str([vars(b) for b in bookings]))
    for booking in bookings:
        if booking.room not in (room, kocherga.room.unknown):
            continue  # irrelevant

        if end_dt <= booking.start_dt:
            continue

        if start_dt >= booking.end_dt:
            continue

        return False

    return True


def bookings_by_email(email):
    events = (
        Event.objects.all()
        .filter(title__startswith="Бронь ")
        .filter(title__endswith=" " + email)
    )

    bookings = [
        Booking.from_event(event)
        for event in events
        if event.title.endswith(" " + email)
    ]

    return bookings


def delete_booking(event_uuid, email):
    event = Event.objects.get(uuid=event_uuid)
    if not event:
        raise PublicError("Not found")

    if "Бронь" not in event.title:
        raise PublicError("Not a booking")

    if not event.title.endswith(" " + email):
        raise PublicError("Access denied")

    event.delete()


def add_booking(date, room, people, start_time, end_time, email):
    room = kocherga.room.normalize(room)
    room = kocherga.room.pretty(room)

    people = str(people)  # accept either int or str

    if not re.match(r"\d+$", people):
        raise PublicError("Invalid number of people: {}".format(people))

    people = int(people)
    if people == 0:
        raise PublicError(
            "Zero people walk into a bar, but bartender ignores all of them."
        )

    # FIXME - take max_people from kocherga.rooms data
    if people > 40:
        raise PublicError("You can't fit more than 40 people in a single room.")

    if len(email) == 0:
        raise PublicError("Email is required.")

    (start_dt, end_dt) = kocherga.events.helpers.build_start_end_dt(
        date, start_time, end_time
    )

    if datetime.datetime.now(TZ) + MAX_BOOKING_DELAY < start_dt:
        raise PublicError("This booking is too far off, we can't allow it.")

    if end_dt <= start_dt:
        raise PublicError("Event should end after it starts.")

    if start_dt < datetime.datetime.now(TZ):
        raise PublicError("The past is already gone.")

    # check availability
    available = check_availability(start_dt, end_dt, room)
    if not available:
        raise PublicError("This room is not available at that time.")

    # insert
    event = Event(
        title=f"Бронь {room}, {people} человек, {email}",
        location=room,
        start=start_dt,
        end=end_dt,
        event_type='private',
        creator=email,
        invite_creator=True,
    )

    event.save()
    return event
