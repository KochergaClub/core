import datetime
import re

import googleapiclient.errors

from kocherga.config import TZ
from kocherga.error import PublicError
import kocherga.room
import kocherga.events.db
from kocherga.events.event import Event

# types:
# room (unicode, lowercase)
# pretty room (unicode, capitalized)
# booking (all params)
# booking.public (start, end, pretty room)

MSK_DATE_FORMAT = '%Y-%m-%dT%H:%M:%S+03:00'

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
        match = re.match(r'Бронь \w+, (\d+) человек', event.title)
        people = None
        if match:
            people = match.group(1)
        return Booking(event.start_dt, event.end_dt, event.get_room(), people, event.google_id)

    def public_object(self):
        return {
            'start': self.start_dt.strftime(MSK_DATE_FORMAT),
            'end': self.end_dt.strftime(MSK_DATE_FORMAT),
            'room': kocherga.room.pretty(self.room),
            'people': self.people,
            'event_id': self.event_id,
        }

def day_bookings(date):
    events = kocherga.events.db.list_events(date=date)

    bookings = [
        Booking.from_event(event)
        for event in events
    ]

    return bookings


def check_availability(start_dt, end_dt, room):
    if not (
        start_dt.date() == end_dt.date()
        or (
            start_dt.date() + datetime.timedelta(days=1) == end_dt.date()
            and end_dt.time() == datetime.time(0, 0)
        )
    ):
        raise PublicError('Starting date and ending date should be equal.')

    room = kocherga.room.normalize(room, fail=True)

    date = start_dt.date()

    bookings = day_bookings(date)
    print([vars(b) for b in bookings])
    for booking in bookings:
        if booking.room not in (room, kocherga.room.unknown):
            continue # irrelevant

        if end_dt <= booking.start_dt:
            continue

        if start_dt >= booking.end_dt:
            continue

        return False

    return True

def bookings_by_email(email):
    events = kocherga.events.db.list_events(q='Бронь {}'.format(email))

    bookings = [
        Booking.from_event(event)
        for event in events
    ]

    return bookings

def delete_booking(event_id, email):
    try:
        event = kocherga.events.db.get_event(event_id)
    except googleapiclient.errors.HttpError as e:
        if e.resp.status == 404:
            raise PublicError('Not found')
        raise e

    if 'Бронь' not in event.title:
        raise PublicError('Not a booking')

    if not event.title.endswith(' ' + email):
        raise PublicError('Access denied')

    kocherga.events.db.delete_event(event_id)

def add_booking(date, room, people, startTime, endTime, email):
    # validate
    dt = datetime.datetime.strptime(date, '%Y-%m-%d').replace(tzinfo=TZ)
    print('TZ: ' + str(TZ))
    print('dt: ' + str(dt))

    if datetime.datetime.today().replace(tzinfo=TZ) + MAX_BOOKING_DELAY < dt:
        raise PublicError("This booking is too far off, we can't allow it.")

    room = kocherga.room.normalize(room)
    room = kocherga.room.pretty(room)

    people = str(people) # accept either int or str

    if not re.match(r'\d+$', people):
        raise PublicError('Invalid number of people: {}'.format(people))

    people = int(people)
    if people == 0:
        raise PublicError('Zero people walk into a bar, but bartender ignores all of them.')

    # FIXME - take max_people from kocherga.rooms data
    if people > 40:
        raise PublicError("You can't fit more than 40 people in a single room.")

    if len(email) == 0:
        raise PublicError('Email is required.')

    def parse_time(t):
        timeParsed = re.match(r'(\d\d):(\d\d)$', t)
        if not timeParsed:
            raise PublicError('Invalid time {}.'.format(t))

        result_dt = dt

        (hour, minute) = (int(timeParsed.group(1)), int(timeParsed.group(2)))
        if hour == 24:
            hour = 0
            result_dt += datetime.timedelta(days=1)

        if minute not in (0, 30):
            raise PublicError("Only booking for 30-minute intervals are allowed")

        return result_dt.replace(hour=hour, minute=minute)

    startDt = parse_time(startTime)
    endDt = parse_time(endTime)
    print(f'booking: {str(startDt)} -> {str(endDt)}')

    if endDt <= startDt:
        raise PublicError("Event should end after it starts.")

    if startDt < datetime.datetime.now(TZ):
        raise PublicError('The past is already gone.')

    # check availability
    available = check_availability(startDt, endDt, room)
    if not available:
        raise PublicError('This room is not available at that time.')

    # insert
    event = Event(
        title='Бронь {room}, {people} человек, {email}'.format(room=room, people=people, email=email),
        location=room,
        start_dt=startDt,
        end_dt=endDt,
        attendees=[email],
    )
    print(f'booking event: {str(event.start_dt)} -> {str(event.end_dt)}')


    return kocherga.events.db.insert_event(event)
