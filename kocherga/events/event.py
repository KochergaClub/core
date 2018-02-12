from pathlib import Path

import dateutil.parser
import hashlib

import kocherga.config
from kocherga.config import TZ

from kocherga.images import image_storage
import kocherga.room
import kocherga.events.google

from kocherga.error import PublicError

from kocherga.datetime import dts

def parse_iso8601(s):
    return dateutil.parser.parse(s).astimezone(TZ)

def image_flag_property(image_type):
    return 'has_{}_image'.format(image_type)

IMAGE_TYPES = ['default', 'vk']

class Event:
    def __init__(
            self,
            start_dt, end_dt,
            created_dt=None, creator=None,
            title='', description='', location='',
            google_id=None, google_link=None,
            is_master=False, master_id=None,
            attendees=[],
            props={}
    ):
        self.created_dt = created_dt
        self.creator = creator
        self.title = title
        self.description = description
        self.start_dt = start_dt
        self.end_dt = end_dt
        self.location = location
        self.google_id = google_id
        self.google_link = google_link
        self.is_master = is_master
        self.master_id = master_id
        self.attendees = attendees
        self.props = props

    @classmethod
    def from_google(cls, google_event):
        obj = cls(
            created_dt=parse_iso8601(google_event['created']),
            creator=google_event['creator'].get('email', 'UNKNOWN'),
            title=google_event['summary'],
            description=google_event.get('description', None),
            start_dt=parse_iso8601(google_event['start']['dateTime']),
            end_dt=parse_iso8601(google_event['end']['dateTime']),
            location=google_event.get('location', ''),
            google_id=google_event['id'],
            google_link=google_event['htmlLink'],
            is_master=('recurrence' in google_event),
            master_id=google_event.get('recurringEventId', None),
            props=google_event.get('extendedProperties', {}).get('private', {}),
        )

        return obj

    def get_room(self):
        if self.location.strip():
            room = kocherga.room.normalize(self.location, fail=False)
            if room:
                return room
            return kocherga.room.unknown

        # TODO - move to kocherga.room.look_for_room_in_string(...)?
        for room in kocherga.room.all_rooms:
            if room in self.title.lower():
                return room # TODO - check that the title is not something like "Кто-то лекционная или ГЭБ"

        return kocherga.room.unknown

    def is_private(self):
        preset_type = self.props.get('type', None)
        if preset_type == 'private':
            return True
        if preset_type == 'public':
            return False

        for keyword in ('бронь', 'аренда', 'инвентаризация'):
            if keyword in self.title.lower():
                return True
        return False

    def get_prop(self, key):
        return self.props.get(key, None)

    def set_prop(self, key, value):
        # Planned future changes: save some or all properties in a local sqlite DB instead.
        # Google sets 1k limit for property values, it won't be enough for longer descriptions (draft, minor changes for timepad, etc).
        kocherga.events.google.set_event_property(self.google_id, key, value)
        self.props[key] = value

    def image_file(self, image_type, check_if_exists=True):
        if not self.get_prop(image_flag_property(image_type)):
            return None

        filename = image_storage.event_image_file(self.google_id, image_type)
        if check_if_exists and not Path(filename).is_file():
            return None

        return filename

    def get_images(self):
        images = {}

        for image_type in IMAGE_TYPES:
            url = kocherga.config.web_root() + '/event/{}/image/{}'.format(self.google_id, image_type)
            filename = self.image_file(image_type)
            if not filename:
                continue

            md5 = hashlib.md5(open(filename, 'rb').read()).hexdigest()

            images[image_type] = url + '?hash=' + md5

        return images

    def add_image(self, image_type, fh):
        if image_type not in IMAGE_TYPES:
            raise PublicError('unknown image type {}'.format(image_type))

        filename = image_storage.event_image_file(event_id, image_type)
        with open(filename, 'wb') as write_fh:
            shutil.copyfileobj(fh, write_fh)

        kocherga.events.google.set_event_property(
            self.google_id,
            image_flag_property(image_type),
            'true'
        )

    # dict for the further serialization (e.g. for api.kocherga.club)
    def to_dict(self):
        d = {
            'id': self.google_id,
            'summary': self.title, # deprecated
            'title': self.title,
            'description': self.description,
            'location': self.location, # deprecated
            'room': self.get_room(),
            'start': {
                'dateTime': dts(self.start_dt),
            },
            'end': {
                'dateTime': dts(self.end_dt),
            },
            'created': dts(self.created_dt),
            'props': dict(self.props),
            'google_link': self.google_link,
            'htmlLink': self.google_link, # deprecated
            'extendedProperties': { # deprecated
                'private': dict(self.props),
            },
        }
        d['type'] = 'private' if self.is_private() else 'public'

        d['images'] = self.get_images()

        return d
