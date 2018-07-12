import logging
logger = logging.getLogger(__name__)

from pathlib import Path
from dateutil.tz import tzutc
import dateutil.parser
import hashlib
import shutil
from datetime import datetime

from sqlalchemy import Column, Integer, String, Boolean, Text, orm
import sqlalchemy

from kocherga.db import Session, Base

import kocherga.config
from kocherga.config import TZ

from kocherga.images import image_storage
import kocherga.room
import kocherga.events.google
import kocherga.events.markup

from kocherga.error import PublicError

from kocherga.datetime import dts, inflected_weekday, inflected_month


def parse_iso8601(s):
    return dateutil.parser.parse(s).astimezone(TZ)


IMAGE_TYPES = ["default", "vk"]


def image_flag_property(image_type):
    if image_type not in IMAGE_TYPES:
        raise PublicError("unknown image type {}".format(image_type))

    return "has_{}_image".format(image_type)


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
    prototype_id = Column(Integer)

    visitors = Column(
        String(100)
    )  # not Integer, because it can take values such as 'no_record' or 'cancelled'
    asked_for_visitors_ts = Column(Integer)
    event_type = Column(String(40))

    vk_group = Column(String(40))
    fb_group = Column(String(40))

    has_default_image = Column(Boolean)
    has_vk_image = Column(Boolean)
    ready_to_post = Column(Boolean)

    # (move these to event_announcements)
    posted_fb = Column(String(1024))
    posted_timepad = Column(String(1024))
    posted_vk = Column(String(1024))

    timepad_category_code = Column(String(40))
    timepad_prepaid_tickets = Column(Boolean)

    timing_description_override = Column(String(255))

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

    @created_dt.setter
    def asked_for_visitors_dt(self, value):
        self.asked_for_visitors_ts = None if value is None else value.timestamp()

    @classmethod
    def by_id(cls, event_id):
        return Session().query(Event).get(event_id)

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

    def is_private(self):
        preset_type = self.event_type
        if preset_type == "private":
            return True
        if preset_type == "public":
            return False

        for keyword in ("бронь", "аренда", "инвентаризация"):
            if keyword in self.title.lower():
                return True
        return False

    def set_field_by_prop(self, key, value):
        if key == "visitors":
            self.visitors = value
        elif key == "vk_group":
            self.vk_group = value
        elif key == "fb_group":
            self.fb_group = value
        elif key == "posted_fb":
            self.posted_fb = value
        elif key == "posted_timepad":
            self.posted_timepad = value
        elif key == "posted_vk":
            self.posted_vk = value

        # huh?
        # should refactor this quick - is_private() can change and this is extremely fragile
        elif key == "type":
            self.event_type = "private" if self.is_private() else "public"

        elif key == "has_default_image":
            self.has_default_image = value in ("true", True)
        elif key == "has_vk_image":
            self.has_vk_image = value in ("true", True)
        elif key == "ready_to_post":
            self.ready_to_post = value in ("true", True)
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

    def generate_summary(self):
        if self.summary:
            return self.summary
        summary = self.description.split("\n\n")[0]
        return kocherga.events.markup.Markup(summary).as_plain()

    def image_file(self, image_type, check_if_exists=True):
        if image_type not in IMAGE_TYPES:
            raise Exception(f"Bad image type {image_type}")

        if image_type == 'default' and not self.has_default_image:
            return None
        if image_type == 'vk' and not self.has_vk_image:
            return None

        filename = image_storage.event_image_file(self.google_id, image_type)
        if check_if_exists and not Path(filename).is_file():
            logger.info(f"{self.google_id} has image prop, but file not found")
            return None

        return filename

    def get_images(self):
        images = {}

        for image_type in IMAGE_TYPES:
            url = kocherga.config.web_root() + "/event/{}/image/{}".format(
                self.google_id, image_type
            )
            filename = self.image_file(image_type)
            if not filename:
                continue

            md5 = hashlib.md5(open(filename, "rb").read()).hexdigest()

            images[image_type] = url + "?hash=" + md5

        return images

    def add_image(self, image_type, fh):
        if image_type not in IMAGE_TYPES:
            raise PublicError("unknown image type {}".format(image_type))

        filename = image_storage.event_image_file(self.google_id, image_type)
        with open(filename, "wb") as write_fh:
            shutil.copyfileobj(fh, write_fh)

        self.set_field_by_prop(image_flag_property(image_type), True)

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
        )
        for field in optional:
            if getattr(self, field):
                d[field] = getattr(self, field)

        d["images"] = self.get_images()

        return d

    def to_google(self):
        convert_dt = lambda dt: dt.astimezone(tzutc()).strftime("%Y-%m-%dT%H:%M:%S.%fZ")

        result = {
            "created": convert_dt(self.created_dt),
            "updated": convert_dt(self.updated_dt),
            "creator": {"email": self.creator},
            "summary": self.title,
            "description": self.description,
            "start": {"dateTime": convert_dt(self.start_dt)},
            "end": {"dateTime": convert_dt(self.end_dt)},
        }
        if self.deleted:
            result['status'] = 'cancelled'
        return result

    def patch_google(self):
        logger.info("Saving to google")
        kocherga.events.google.patch_event(self.google_id, self.to_google())
