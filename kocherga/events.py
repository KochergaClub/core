import datetime
import dateutil.parser

import kocherga.calendar_api
import kocherga.timepad

CALENDAR = 'lv3963udctvoh944c7dlik5td4@group.calendar.google.com'


def api():
    return kocherga.calendar_api.get_service()


def get_event(event_id):
    return api().events().get(calendarId=CALENDAR, eventId=event_id).execute()

def post_to_timepad(event_id):
    event = get_event(event_id)
    timepad_event = kocherga.timepad.create(event)

    set_property(event_id, 'timepad', timepad_event['url'])


def check_timepad(event_id):
    event = get_event(event_id)
    timepad_url = event.get('extendedProperties', {}).get('private', {}).get('timepad', None)
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
    preset_type = event.get('extendedProperties', {}).get('private', {}).get(
        'type', None)
    if preset_type == 'private':
        return True
    if preset_type == 'public':
        return False

    for keyword in ('бронь', 'аренда', 'инвентаризация'):
        if keyword in event['summary'].lower():
            return True
    return False


def event2room(event):
    ROOMS = ['лекционная', 'гэб', 'китайская', 'летняя']
    if 'location' in event:
        location = event.get('location').strip().lower()
        if location in ROOMS:
            # everything is ok
            return location
        if len(location):
            return 'unknown'

    for room in ROOMS:
        if room in event['summary'].lower():
            return room # TODO - check that the title is not something like "Кто-то лекционная или ГЭБ"

    return 'unknown'


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
        event['type'] = 'private' if is_private(event) else 'public'

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
