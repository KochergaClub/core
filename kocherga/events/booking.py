import datetime
import re

from kocherga.common import PublicError
import kocherga.room
from kocherga.events import events_with_condition, event2room
import kocherga.events

MSK_TZ = datetime.timezone(datetime.timedelta(hours=3)) # unused for now
MSK_DATE_FORMAT = '%Y-%m-%dT%H:%M:%S+03:00'

# types:
# room (unicode, lowercase)
# pretty room (unicode, capitalized)
# booking (all params)
# booking.public (start, end, pretty room)

class Booking:
    BOOKING_DATE_FORMAT = '%Y-%m-%dT%H:%M:%S+03:00'

    def __init__(self, start_dt, end_dt, room):
        self.start_dt = start_dt
        self.end_dt = end_dt
        kocherga.room.validate(room)
        self.room = room

    @classmethod
    def from_event(self, event):
        start_dt = datetime.datetime.strptime(event['start']['dateTime'], self.BOOKING_DATE_FORMAT)
        end_dt = datetime.datetime.strptime(event['end']['dateTime'], self.BOOKING_DATE_FORMAT)

        room = event2room(event)
        # TODO - parse the number of people and other info for the booking.py-created bookings

        return Booking(start_dt, end_dt, room)

    def public_object(self):
        return {
            'start': self.start_dt.strftime(self.BOOKING_DATE_FORMAT),
            'end': self.end_dt.strftime(self.BOOKING_DATE_FORMAT),
            'room': kocherga.room.pretty(self.room),
        }

def day_bookings(date):
    dt = datetime.datetime.combine(date, datetime.datetime.min.time())
    events = events_with_condition(
        timeMin=dt.isoformat() + 'Z',
        timeMax=(dt + datetime.timedelta(days=1)).isoformat() + 'Z',
    )

    bookings = [
        Booking.from_event(event)
        for event in events
    ]

    return bookings


def check_availability(start_dt, end_dt, room):
    if not start_dt.date() == end_dt.date():
        raise PublicError('Starting date and ending date should be equal.')

    room = kocherga.room.normalize(room, fail=True)
    print(room)

    date = start_dt.date()

    bookings = day_bookings(date)
    for booking in bookings:
        if booking.room not in (room, kocherga.room.unknown):
            continue # irrelevant

        if end_dt < booking.start_dt:
            continue

        if start_dt > booking.end_dt:
            continue

        return False

    return True


def add_booking(date, room, people, startTime, endTime, contact):
    # validate
    dt = datetime.datetime.strptime(date, '%Y-%m-%d')

    room = kocherga.room.normalize(room)
    room = kocherga.room.pretty(room)

    people = str(people) # accept either int or str

    if not re.match(r'\d+$', people):
        raise PublicError('Invalid number of people: {}'.format(people))

    people = int(people)
    if people == 0:
        raise PublicError('Zero people walk into a bar, but bartender ignores all of them.')

    if people > 40:
        raise PublicError("You can't fit more than 40 people in a single Kocherga.")

    if len(contact) == 0:
        raise PublicError('Contact is required.')

    if dt < datetime.datetime.today():
        raise PublicError('The past is already gone.')

    def parse_time(t):

        timeParsed = re.match(r'(\d\d):(\d\d)$', t)
        if not timeParsed:
            raise PublicError('Invalid time {}.'.format(t))

        return dt.replace(hour=int(timeParsed.group(1)), minute=int(timeParsed.group(2)))

    startDt = parse_time(startTime)
    endDt = parse_time(endTime)

    if endDt <= startDt:
        raise PublicError("Event should end after it starts.")

    # check availability
    available = check_availability(startDt, endDt, room)
    if not available:
        raise PublicError('This room is not available at that time.')

    # insert
    event = {
        'summary': 'Бронь {room}, {people} человек, {contact}'.format(room=room, people=people, contact=contact),
        'location': room,
        'start': {
            'dateTime': startDt.strftime(MSK_DATE_FORMAT),
        },
        'end': {
            'dateTime': endDt.strftime(MSK_DATE_FORMAT),
        },
    }
    result = kocherga.events.api().events().insert(
        calendarId=kocherga.events.CALENDAR,
        body=event,
    ).execute()
    return result
