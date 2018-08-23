import logging

logger = logging.getLogger(__name__)

import datetime
import re
import googleapiclient.errors

from kocherga.config import TZ
from kocherga.datetime import MSK_DATE_FORMAT
from kocherga.error import PublicError

import kocherga.room
import kocherga.events.db
from kocherga.events.event import Event
import kocherga.events.helpers

# types:
# room (unicode, lowercase)
# pretty room (unicode, capitalized)
# booking (all params)
# booking.public (start, end, pretty room)

MAX_BOOKING_DELAY = datetime.timedelta(days=60)


class Booking:

    def __init__(self, start_dt, end_dt, room, people, event_id=None):
        self.start_dt = start_dt
        self.end_dt = end_dt
        kocherga.room.validate(room)
        self.room = room
        self.people = people
        self.event_id = event_id

    @classmethod
    def from_event(self, event):
        match = re.match(r"Бронь \w+, (\d+) человек", event.title)
        people = None
        if match:
            people = match.group(1)
        return Booking(
            event.start_dt, event.end_dt, event.get_room(), people, event.google_id
        )

    def public_object(self):
        return {
            "start": self.start_dt.strftime(MSK_DATE_FORMAT),
            "end": self.end_dt.strftime(MSK_DATE_FORMAT),
            "room": kocherga.room.pretty(self.room),
            "people": self.people,
            "event_id": self.event_id,
        }


def day_bookings(date):
    events = kocherga.events.db.list_events(date=date)

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
    logger.debug(
        str([vars(b) for b in bookings])
    )
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
    events = kocherga.events.db.list_events(q="Бронь {}".format(email))

    bookings = [Booking.from_event(event) for event in events]

    return bookings


def delete_booking(event_id, email):
    event = Event.by_id(event_id)
    if not event:
        raise PublicError("Not found")

    if "Бронь" not in event.title:
        raise PublicError("Not a booking")

    if not event.title.endswith(" " + email):
        raise PublicError("Access denied")

    kocherga.events.db.delete_event(event_id)


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

    (start_dt, end_dt) = kocherga.events.helpers.build_start_end_dt(date, start_time, end_time)

    if datetime.datetime.today().replace(tzinfo=TZ) + MAX_BOOKING_DELAY < start_dt:
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
        title="Бронь {room}, {people} человек, {email}".format(
            room=room, people=people, email=email
        ),
        location=room,
        start_dt=start_dt,
        end_dt=end_dt,
        attendees=[email],
    )

    return kocherga.events.db.insert_event(event)
