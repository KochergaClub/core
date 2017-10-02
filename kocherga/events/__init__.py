import re
import datetime
import hashlib

import os.path

from werkzeug.utils import secure_filename

import kocherga.events.google
import kocherga.events.timepad

from kocherga.common import PublicError, web_root, image_storage, ROOMS

CALENDAR = 'lv3963udctvoh944c7dlik5td4@group.calendar.google.com'

IMAGE_TYPES = ['default', 'vk']

def api():
    return kocherga.events.google.get_service()


def get_property(event, key):
    return event.get('extendedProperties', {}).get('private', {}).get(key, None)


def image_flag_property(image_type):
    return 'has_{}_image'.format(image_type)


def improve_event(event):
    event['type'] = 'private' if is_private(event) else 'public'
    event['images'] = {}

    for image_type in IMAGE_TYPES:
        if not get_property(event, image_flag_property(image_type)):
            continue
        url = web_root() + '/event/{}/image/{}'.format(event['id'], image_type)

        filename = image_storage.event_image_file(event['id'], image_type)
        if not os.path.isfile(filename):
            continue

        md5 = hashlib.md5(open(filename, 'rb').read()).hexdigest()

        event['images'][image_type] = url + '?hash=' + md5

    return event


def get_event(event_id):
    event = api().events().get(calendarId=CALENDAR, eventId=event_id).execute()
    return improve_event(event)


def post_to_timepad(event_id):
    event = get_event(event_id)
    timepad_event = kocherga.events.timepad.create(event)

    set_property(event_id, 'timepad', timepad_event['url'])


def check_timepad(event_id):
    event = get_event(event_id)
    timepad_url = get_property(event, 'timepad')
    if not timepad_url:
        return 'no url'

    if kocherga.events.timepad.check(timepad_url):
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
