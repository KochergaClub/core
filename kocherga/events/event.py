from pathlib import Path

import dateutil.parser
import hashlib
import shutil
from datetime import datetime

from sqlalchemy import Column, Integer, String, Boolean, orm

import kocherga.db

import kocherga.config
from kocherga.config import TZ

from kocherga.images import image_storage
import kocherga.room
import kocherga.events.google

from kocherga.error import PublicError

from kocherga.datetime import dts

def parse_iso8601(s):
    return dateutil.parser.parse(s).astimezone(TZ)

IMAGE_TYPES = ['default', 'vk']

def image_flag_property(image_type):
    if image_type not in IMAGE_TYPES:
        raise PublicError('unknown image type {}'.format(image_type))

    return 'has_{}_image'.format(image_type)

class Event(kocherga.db.Base):
    __tablename__ = 'events'
    google_id = Column(String, primary_key=True)
    google_link = Column(String)

    start_ts = Column(Integer)
    end_ts = Column(Integer)
    created_ts = Column(Integer)
    updated_ts = Column(Integer)
    creator = Column(String)

    title = Column(String)
    # Not a google_event.summary! We don't store this field on google at all for now. This is for the short schedule/timepad/email summaries.
    summary = Column(String)
    description = Column(String)

    location = Column(String)

    is_master = Column(Boolean)
    master_id = Column(String)

    visitors = Column(String) # not Integer, because it can take values such as 'no_record' or 'cancelled'
    asked_for_visitors_ts = Column(Integer)
    event_type = Column(String)

    vk_group = Column(String)
    fb_group = Column(String)

    has_default_image = Column(Boolean)
    has_vk_image = Column(Boolean)
    ready_to_post = Column(Boolean)

    # TODO - ready-to-post, announcements link (posted-vk, posted-fb, posted-timepad)
    # TODO - collect all properties

    ### all existing props:
    # [?] _timepad_
    # [x] asked_for_visitors
    # [?] bar
    # [x] fb_group
    # [?] foo
    # [x] has_default_image
    # [?] has_image
    # [x] has_vk_image
    # [?] hello
    # [a] posted-fb
    # [a] posted-timepad
    # [a] posted-vk
    # [x] ready-to-post
    # [a] timepad
    # [x] type
    # [x] visitors
    # [a] vk-link
    # [x] vk_group

    def __init__(
            self,
            start_dt, end_dt,
            created_dt=None, updated_dt=None,
            creator=None,
            title='', description='', location='',
            google_id=None, google_link=None,
            is_master=False, master_id=None,
            attendees=[],
            props={}
    ):
        self.created_dt = created_dt or datetime.now(TZ)
        self.updated_dt = updated_dt or self.created_dt
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

        self.visitors = self.get_prop('visitors')
        self.event_type = self.get_prop('type')
        self.vk_group = self.get_prop('vk_group')
        self.fb_group = self.get_prop('fb_group')
        self.has_default_image = self.get_prop('has_default_image') in ('true', True)
        self.has_vk_image = self.get_prop('has_vk_image') in ('true', True)
        self.ready_to_post = self.get_prop('ready-to-post') in ('true', True)
        if self.get_prop('asked_for_visitors'):
            self.asked_for_visitors_ts = datetime.strptime(self.get_prop('asked_for_visitors'), '%Y-%m-%d %H:%M').replace(tzinfo=TZ).timestamp()
        else:
            self.asked_for_visitors_ts = None

    @orm.reconstructor
    def init_on_load(self):
        # deprecated
        self.props = {
            'visitors': self.visitors,
            'type': self.event_type,
            'vk_group': self.vk_group,
            'fb_group': self.fb_group,
            'has_default_image': self.has_default_image,
            'has_vk_image': self.has_vk_image,
            'ready-to-post': self.ready_to_post,
            'asked_for_visitors': datetime.fromtimestamp(self.asked_for_visitors_ts, TZ).strftime('%Y-%m-%d %H:%M') if self.asked_for_visitors_ts else None,
            'visitors': self.visitors,
        }

        self.created_dt = datetime.fromtimestamp(self.created_ts, TZ)
        self.updated_dt = datetime.fromtimestamp(self.updated_ts, TZ)
        self.start_dt = datetime.fromtimestamp(self.start_ts, TZ)
        self.end_dt = datetime.fromtimestamp(self.end_ts, TZ)

    @property
    def created_dt(self):
        return datetime.fromtimestamp(self.created_ts, TZ)

    @created_dt.setter
    def created_dt(self, value):
        self.created_ts = value.timestamp()

    @property
    def updated_dt(self):
        return datetime.fromtimestamp(self.updated_ts, TZ)

    @updated_dt.setter
    def updated_dt(self, value):
        self.updated_ts = value.timestamp()

    @property
    def start_dt(self):
        return datetime.fromtimestamp(self.start_ts, TZ)

    @start_dt.setter
    def start_dt(self, value):
        self.start_ts = value.timestamp()

    @property
    def end_dt(self):
        return datetime.fromtimestamp(self.end_ts, TZ)

    @end_dt.setter
    def end_dt(self, value):
        self.end_ts = value.timestamp()

    @classmethod
    def from_google(cls, google_event):
        obj = cls(
            created_dt=parse_iso8601(google_event['created']),
            updated_dt=parse_iso8601(google_event['updated']),
            creator=google_event['creator'].get('email', 'UNKNOWN'),
            title=google_event.get('summary', ''),
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
        kocherga.events.google.set_property(self.google_id, key, value)
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

        filename = image_storage.event_image_file(self.google_id, image_type)
        with open(filename, 'wb') as write_fh:
            shutil.copyfileobj(fh, write_fh)

        self.set_prop(image_flag_property(image_type), 'true')

    def fb_announce_page(self):
        fb_group = self.get_prop('fb_group')
        if fb_group:
            return f'https://www.facebook.com/groups/{fb_group}'
        else:
            return kocherga.config.config()['fb']['main_page']['announce_page']

    # dict for the further serialization (e.g. for api.kocherga.club)
    def to_dict(self):
        d = {
            'id': self.google_id,
            'summary': self.summary,
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
            'props': dict(self.props), # deprecated
            'google_link': self.google_link,
            'htmlLink': self.google_link, # deprecated
            'extendedProperties': { # deprecated
                'private': dict(self.props),
            },
            # TODO - add field from props as top-level fields
        }
        d['type'] = 'private' if self.is_private() else 'public'

        if self.master_id:
            d['master_id'] = self.master_id
        if self.is_master:
            d['is_master'] = self.is_master

        d['images'] = self.get_images()

        return d
