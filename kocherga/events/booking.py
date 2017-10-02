import datetime
from kocherga.common import PublicError, ROOMS
from kocherga.events import events_with_condition, event2room

MSK_TZ = datetime.timezone(datetime.timedelta(hours=3)) # unused for now
MSK_DATE_FORMAT = '%Y-%m-%dT%H:%M:%S+03:00'

def _validate_room(room):
    if room not in ROOMS:
        raise PublicError('Unknown room {}.'.format(room))

def day_bookings(date):
    dt = datetime.datetime.combine(date, datetime.datetime.min.time())
    events = events_with_condition(
        timeMin=dt.isoformat() + 'Z',
        timeMax=(dt + datetime.timedelta(days=1)).isoformat() + 'Z',
    )

    bookings = []

    for event in events:
        bookings.append({
            'start': event['start']['dateTime'],
            'end': event['end']['dateTime'],
            'room': event2room(event)
        })

    return bookings


def check_availability(startDt, endDt, room):
    if not startDt.date() == endDt.date():
        raise PublicError('Starting date and ending date should be equal.')

    _validate_room(room)

    date = startDt.date()

    bookings = day_bookings(date)
    for booking in bookings:
        if booking['room'] not in (room, 'unknown'):
            continue # irrelevant

        BOOKING_DATE_FORMAT = '%Y-%m-%dT%H:%M:%S+03:00'
        bookingStartDt = datetime.strptime(booking.start, BOOKING_DATE_FORMAT)
        bookingEndDt = datetime.strptime(booking.end, BOOKING_DATE_FORMAT)

        if endDt < bookingStartDt:
            return False

        if startDt < bookingStartDt:
            return False

    return True


def add_booking(date, room, people, startTime, endTime, contact):
    # validate
    dt = datetime.datetime.strptime(date, '%Y-%m-%d')

    _validate_room(room)

    if not re.match(r'\d+$', people):
        raise PublicError('Invalid number of people: {}'.format(people))

    people = int(people)
    if people == 0:
        raise PublicError('Zero people walk into a bar, but bartender ignores all of them.')

    if people > 40:
        raise PublicError("You can't fit more than 40 people in a single Kocherga.")

    if len(contact) == 0:
        raise PublicError('Contact is required.')

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
    bookings = check_availability(startDt, endDt, room)

    # insert
    event = {
        'summary': 'Бронь {room}, {people} человек'.format(room=room, people=people),
        'location': room,
        'start': {
            'dateTime': startDt.strftime(MSK_DATE_FORMAT),
        },
        'end': {
            'dateTime': endDt.strftime(MSK_DATE_FORMAT),
        },
    }
    api().events().insert(
        calendarId=CALENDAR,
        body=event,
    ).execute()
