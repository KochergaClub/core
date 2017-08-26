import re
import datetime
import hashlib

import os.path

from werkzeug.utils import secure_filename

import kocherga.calendar_api
import kocherga.timepad

from kocherga.common import PublicError, web_root, upload_dir

CALENDAR = 'lv3963udctvoh944c7dlik5td4@group.calendar.google.com'

ROOMS = ['лекционная', 'гэб', 'китайская', 'летняя']

MSK_TZ = datetime.timezone(datetime.timedelta(hours=3)) # unused for now
MSK_DATE_FORMAT = '%Y-%m-%dT%H:%M:%S+03:00'

IMAGE_TYPES = ['default', 'vk']

def api():
    return kocherga.calendar_api.get_service()


def get_property(event, key):
    return event.get('extendedProperties', {}).get('private', {}).get(key, None)


def image_flag_property(image_type):
    return 'has_{}_image'.format(image_type)


def image_filename(event_id, image_type):
    return secure_filename('event_image.{}.{}.jpg'.format(image_type, event_id))


def full_image_filename(event_id, image_type):
    return os.path.join(upload_dir(), image_filename(event_id, image_type))


def improve_event(event):
    event['type'] = 'private' if is_private(event) else 'public'
    event['images'] = {}

    for image_type in IMAGE_TYPES:
        if not get_property(event, image_flag_property(image_type)):
            continue
        url = web_root() + '/event/{}/image/{}'.format(event['id'], image_type)
        filename = full_image_filename(event['id'], image_type)
        md5 = hashlib.md5(open(filename, 'rb').read()).hexdigest()

        event['images'][image_type] = url + '?hash=' + md5

    return event


def get_event(event_id):
    event = api().events().get(calendarId=CALENDAR, eventId=event_id).execute()
    return improve_event(event)


def post_to_timepad(event_id):
    event = get_event(event_id)
    timepad_event = kocherga.timepad.create(event)

    set_property(event_id, 'timepad', timepad_event['url'])


def check_timepad(event_id):
    event = get_event(event_id)
    timepad_url = get_property(event, 'timepad')
    if not timepad_url:
        return 'no url'

    if kocherga.timepad.check(timepad_url):
        return 'event exists'

    set_property(event_id, 'timepad', None) # not found
    return 'event not found, unset'


def set_property(event_id, key, value):
    api().events().patch(calendarId=CALENDAR,
                         eventId=event_id,
                         body={
                             "extendedProperties": {
                                 "private": {
                                     key: value
                                 }
                             }
                         }).execute()


def is_private(event):
    preset_type = get_property(event, 'type')
    if preset_type == 'private':
        return True
    if preset_type == 'public':
        return False

    for keyword in ('бронь', 'аренда', 'инвентаризация'):
        if keyword in event['summary'].lower():
            return True
    return False


def event2room(event):
    if 'location' in event:
        location = event.get('location').strip().lower()
        if location in ROOMS:
            # everything is ok
            return location.capitalize()
        if len(location):
            return 'Unknown'

    for room in ROOMS:
        if room in event['summary'].lower():
            return room.capitalize() # TODO - check that the title is not something like "Кто-то лекционная или ГЭБ"

    return 'Unknown'


def get_week_boundaries():
    today = datetime.datetime.today()

    monday = datetime.datetime.combine(
        today - datetime.timedelta(days=today.weekday()),
        datetime.time())
    sunday = monday + datetime.timedelta(days=7)

    return (monday, sunday)


def events_with_condition(**kwargs):
    kw = {
        'calendarId': CALENDAR,
        'maxResults': 100,
        'singleEvents': True,
        'orderBy': 'startTime',
    }
    kw.update(kwargs)

    eventsResult = api().events().list(**kw).execute()
    events = eventsResult.get('items', [])

    events = [e for e in events
              if 'dateTime' in e['start']]  # filter out all-day events

    for event in events:
        event = improve_event(event)

    return events


def current_week_events():
    (monday, sunday) = get_week_boundaries()
    return events_with_condition(timeMin=monday.isoformat() + 'Z',
                                 timeMax=sunday.isoformat() + 'Z', )


def all_future_events():
    return events_with_condition(
        timeMin=datetime.datetime.today().isoformat() + 'Z',
        timeMax=(datetime.datetime.today() + datetime.timedelta(weeks=8)).isoformat() + 'Z',
    )


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


def add_booking(date, room, people, startTime, endTime, contact):
    # validate
    dt = datetime.datetime.strptime(date, '%Y-%m-%d')

    if room not in ROOMS:
        raise PublicError('unknown room {}'.format(room))

    if not re.match(r'\d+$', people):
        raise PublicError('invalid number of people: {}'.format(people))

    people = int(people)
    if people == 0:
        raise PublicError('zero rights for zero people, sorry')

    if people > 40:
        raise PublicError("you can't fit more than 40 people in a single Kocherga")

    if len(contact) == 0:
        raise PublicError('contact is required')

    def parse_time(t):

        timeParsed = re.match(r'(\d\d):(\d\d)$', t)
        if not timeParsed:
            raise PublicError('invalid time {}'.format(t))

        return dt.replace(hour=int(timeParsed.group(1)), minute=int(timeParsed.group(2)))

    startDt = parse_time(startTime)
    endDt = parse_time(endTime)

    if endDt <= startDt:
        raise PublicError("event should end after it starts")

    # check availability
    bookings = check_bookings(startDt, endDt, room)

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
