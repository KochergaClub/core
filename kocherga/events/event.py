import logging
logger = logging.getLogger(__name__)

from pathlib import Path
from dateutil.tz import tzutc
import dateutil.parser
import shutil
from datetime import datetime

from sqlalchemy import Column, Integer, String, Boolean, Text
from sqlalchemy.orm import relationship
import sqlalchemy

from kocherga.db import Session, Base

import kocherga.config
from kocherga.config import TZ
from kocherga.datetime import MSK_DATE_FORMAT

from kocherga.images import image_storage
import kocherga.room
import kocherga.events.google
import kocherga.events.markup
from kocherga.events.tag import EventTag

from kocherga.error import PublicError

from kocherga.datetime import dts, inflected_weekday, inflected_month


def parse_iso8601(s):
    return dateutil.parser.parse(s).astimezone(TZ)


IMAGE_TYPES = ["default", "vk"]


class Event(Base):
    __tablename__ = "events"

    google_id = Column(String(100), primary_key=True)
    google_link = Column(String(1024))

    start_ts = Column(Integer)
    end_ts = Column(Integer)
    created_ts = Column(Integer)
    updated_ts = Column(Integer)
    creator = Column(String(255))

    title = Column(String(255))
    # Not a google_event.summary! We don't store this field on google at all for now. This is for the short schedule/timepad/email summaries.
    summary = Column(Text, nullable=False)
    description = Column(Text, nullable=False)

    deleted = Column(Boolean, default=False)

    location = Column(String(255))

    is_master = Column(Boolean)
    master_id = Column(String(100))
    prototype_id = Column(Integer, index=True)

    visitors = Column(
        String(100)
    )  # not Integer, because it can take values such as 'no_record' or 'cancelled'
    asked_for_visitors_ts = Column(Integer)
    event_type = Column(String(40), default="unknown")

    vk_group = Column(String(40))
    fb_group = Column(String(40))

    image = Column(String(32))
    vk_image = Column(String(32))

    ready_to_post = Column(Boolean)

    # (move these to event_announcements)
    posted_fb = Column(String(1024))
    posted_timepad = Column(String(1024))
    posted_vk = Column(String(1024))

    timepad_category_code = Column(String(40))
    timepad_prepaid_tickets = Column(Boolean)
    timing_description_override = Column(String(255))

    tags = relationship(
        "EventTag",
        order_by=EventTag.name,
        back_populates="event",
        cascade="all, delete, delete-orphan"
    )

    def __init__(
        self,
        start_dt,
        end_dt,
        created_dt=None,
        updated_dt=None,
        creator=None,
        title="",
        description="",
        summary="",
        location="",
        google_id=None,
        google_link=None,
        is_master=False,
        master_id=None,
        attendees=[],
    ):
        self.created_dt = created_dt or datetime.now(TZ)
        self.updated_dt = updated_dt or self.created_dt
        self.creator = creator
        self.title = title or ''
        self.summary = summary or ''
        self.description = description or ''
        self.start_dt = start_dt
        self.end_dt = end_dt
        self.location = location
        self.google_id = google_id
        self.google_link = google_link
        self.is_master = is_master
        self.master_id = master_id
        self.attendees = attendees
        self.event_type = "unknown"

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

    @property
    def asked_for_visitors_dt(self):
        if not self.asked_for_visitors_ts:
            return None
        return datetime.fromtimestamp(self.asked_for_visitors_ts, TZ)

    @asked_for_visitors_dt.setter
    def asked_for_visitors_dt(self, value):
        self.asked_for_visitors_ts = None if value is None else value.timestamp()

    @classmethod
    def by_id(cls, event_id):
        return Session().query(Event).get(event_id)

    @classmethod
    def query(cls):
        return Session().query(Event).filter_by(deleted=False)

    @classmethod
    def from_google(cls, google_event):
        obj = cls(
            created_dt=parse_iso8601(google_event["created"]),
            updated_dt=parse_iso8601(google_event["updated"]),
            creator=google_event["creator"].get("email", "UNKNOWN"),
            title=google_event.get("summary", ""),
            description=google_event.get("description", None),
            start_dt=parse_iso8601(google_event["start"]["dateTime"]),
            end_dt=parse_iso8601(google_event["end"]["dateTime"]),
            location=google_event.get("location", ""),
            google_id=google_event["id"],
            google_link=google_event["htmlLink"],
            is_master=("recurrence" in google_event),
            master_id=google_event.get("recurringEventId", None),
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
                return (
                    room
                )  # TODO - check that the title is not something like "Кто-то лекционная или ГЭБ"

        return kocherga.room.unknown

    def set_field_by_prop(self, key, value):
        if key in (
                "visitors",
                "vk_group", "fb_group",
                "posted_fb", "posted_timepad", "posted_vk",
                "title", "location", "description", "summary",
                "timepad_category_code",
                "timing_description_override",
        ):
            assert type(value) == str
            setattr(self, key, value)

        elif key == "type":
            if value not in ("private", "public"):
                raise Exception("type can only be set to public or private")
            self.event_type = value

        elif key == "ready_to_post":
            self.ready_to_post = value in ("true", True)
        elif key == "timepad_prepaid_tickets":
            self.timepad_prepaid_tickets = value in ("true", True)
        elif key == "asked_for_visitors":
            if value:
                self.asked_for_visitors_ts = (
                    datetime.strptime(value, "%Y-%m-%d %H:%M")
                    .replace(tzinfo=TZ)
                    .timestamp()
                )
            else:
                self.asked_for_visitors_ts = None
        else:
            raise PublicError(f"Unknown prop {key}")

    def patch(self, data):
        for (key, value) in data.items():
            self.set_field_by_prop(key, value)

        self.patch_google()

    def generate_summary(self):
        if self.summary:
            return self.summary
        summary = self.description.split("\n\n")[0]
        return kocherga.events.markup.Markup(summary).as_plain()


    def image_file(self, image_type):
        image_id = None
        if image_type == 'vk':
            image_id = self.vk_image
        elif image_type == 'default':
            image_id = self.image
        else:
            raise Exception(f"Bad image type {image_type}")
        if not image_id:
            return None

        return image_storage.get_filename(image_id)


    def get_images(self):
        images = {}

        for image_type in IMAGE_TYPES:
            if image_type == 'default':
                image_id = self.image
            elif image_type == 'vk':
                image_id = self.vk_image
            else:
                raise NotImplemented

            if not image_id:
                continue

            url = kocherga.config.web_root() + f"/images/{image_id}"
            images[image_type] = url

        return images


    def add_image(self, image_type, fh):
        if image_type not in IMAGE_TYPES:
            raise PublicError("unknown image type {}".format(image_type))

        key = image_storage.add_file(fh)
        if image_type == 'default':
            self.image = key
        elif image_type == 'vk':
            self.vk_image = key
        else:
            raise NotImplemented


    def fb_announce_page(self):
        if self.fb_group:
            return f"https://www.facebook.com/groups/{self.fb_group}"
        else:
            return kocherga.config.config()["fb"]["main_page"]["announce_page"]

    @property
    def timing_description(self):
        if self.timing_description_override:
            return self.timing_description_override

        return "Встреча пройдёт в {weekday} {day} {month}, в {time},".format(
            weekday=inflected_weekday(self.start_dt),
            day=self.start_dt.day,
            month=inflected_month(self.start_dt),
            time=self.start_dt.strftime("%H:%M"),
        )

    def delete(self):
        self.deleted = True

    # dict for the further serialization (e.g. for api.kocherga.club)
    def to_dict(self):
        d = {
            "id": self.google_id,
            "summary": self.summary,
            "title": self.title,
            "description": self.description,
            "location": self.location,  # deprecated
            "room": self.get_room(),
            "start": {"dateTime": dts(self.start_dt)},
            "end": {"dateTime": dts(self.end_dt)},
            "created": dts(self.created_dt),
            "google_link": self.google_link,
            "type": self.event_type,
            "timepad_category_code": self.timepad_category_code,
            "timepad_prepaid_tickets": self.timepad_prepaid_tickets,
            "timing_description_override": self.timing_description_override,
        }

        optional = (
            "master_id",
            "is_master",
            "prototype_id",
            "vk_group",
            "fb_group",
            "ready_to_post",
            "visitors",
            "posted_vk",
            "posted_fb",
            "posted_timepad",
            "deleted"
        )
        for field in optional:
            if getattr(self, field):
                d[field] = getattr(self, field)

        d["images"] = self.get_images()

        d["tags"] = self.tag_names()

        return d

    def to_google(self):
        convert_dt = lambda dt: dt.astimezone(tzutc()).strftime("%Y-%m-%dT%H:%M:%S.%fZ")

        result = {
            "created": convert_dt(self.created_dt),
            "updated": convert_dt(self.updated_dt),
            "creator": {"email": self.creator},
            "summary": self.title,
            "description": self.description,
            "location": self.location,
            "start": {"dateTime": convert_dt(self.start_dt)},
            "end": {"dateTime": convert_dt(self.end_dt)},
        }
        if self.deleted:
            result['status'] = 'cancelled'
        return result

    def patch_google(self):
        logger.info("Saving to google")
        kocherga.events.google.patch_event(self.google_id, self.to_google())

    def tag_names(self):
        return [
            tag.name
            for tag in self.tags
        ]

    def add_tag(self, tag_name):
        if tag_name in self.tag_names():
            raise Exception(f"Tag {tag_name} already exists on this event")
        self.tags.append(EventTag(name=tag_name))

    def delete_tag(self, tag_name):
        self.tags.remove(next(tag for tag in self.tags if tag.name == tag_name))

    def public_object(self):
        # Some precautions against information leaking (although we do more checks in /public_events API route).
        if self.deleted: return {}
        if self.event_type != 'public': return {}

        announcements = {}

        for (key, attr) in [("vk", "posted_vk"), ("fb", "posted_fb"), ("timepad", "posted_timepad")]:
            if getattr(self, attr):
                announcements[key] = {
                    "link": getattr(self, attr),
                }

        return {
            "event_id": self.google_id,
            "title": self.title,
            "room": kocherga.room.pretty(self.get_room()),
            "announcements": announcements,
            "start": self.start_dt.strftime(MSK_DATE_FORMAT),
            "end": self.end_dt.strftime(MSK_DATE_FORMAT),
        }
