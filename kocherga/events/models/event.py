import logging
logger = logging.getLogger(__name__)

from dateutil.tz import tzutc
import dateutil.parser
from datetime import datetime, time

from asgiref.sync import async_to_sync
import channels.layers

from django.db import models
from django.conf import settings
from django.utils import timezone

from kocherga.dateutils import TZ, inflected_weekday, inflected_month

from kocherga.images import image_storage
import kocherga.room
from kocherga.error import PublicError

import kocherga.events.google
import kocherga.events.markup

from kocherga.timepad.models import Event as TimepadEvent


def parse_iso8601(s):
    return dateutil.parser.parse(s).astimezone(TZ)


IMAGE_TYPES = ["default", "vk"]


def ts_now():
    return datetime.now(TZ).timestamp()


class EventManager(models.Manager):
    def notify_update(self):
        async_to_sync(channels.layers.get_channel_layer().group_send)(
            'events_group', {
                'type': 'notify.update',
            }
        )

    def list_events(
        self,
        date: datetime.date = None,
        from_date: datetime.date = None,
        to_date: datetime.date = None,
        order_by = None,
    ):
        order_args = None
        if order_by == "updated":
            order_args = 'updated'
        else:
            order_args = 'start'

        query = (
            super().get_queryset()
            .filter(deleted=False)
            .order_by(order_args)
        )

        if date:
            from_date = to_date = date

        if from_date:
            query = query.filter(start__gte = datetime.combine(from_date, time.min, tzinfo=TZ))

        if to_date:
            query = query.filter(start__lte = datetime.combine(to_date, time.max, tzinfo=TZ))

        return query

    def public_events(self, date=None, from_date=None, to_date=None, tag=None):
        if not from_date and not to_date and not date:
            raise PublicError("One of 'date', 'from_date', 'to_date' must be set")

        query = self.list_events(date=date, from_date=from_date, to_date=to_date)

        query = (
            query
            .filter(event_type = 'public')
            .exclude(posted_vk__isnull = True)
            .exclude(posted_vk = '')
            .filter(start__gte = datetime(2018, 6, 1))  # earlier events are not cleaned up yet
        )

        if tag:
            query = query.filter(tags__name = tag)

        return query


class Event(models.Model):
    class Meta:
        db_table = "events"
        verbose_name = 'Событие'
        verbose_name_plural = 'События'

    objects = EventManager()

    google_id = models.CharField(max_length=100, primary_key=True)
    google_link = models.CharField(max_length=1024)

    start = models.DateTimeField()
    end = models.DateTimeField()

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    creator = models.CharField(max_length=255, null=True, blank=True)

    title = models.CharField(max_length=255)

    # Not a google_event.summary!
    # We don't store this field on google at all. This is for the short schedule/timepad/email summaries.
    summary = models.TextField(blank=True)

    description = models.TextField(blank=True)

    deleted = models.BooleanField(default=False)

    location = models.CharField(max_length=255, blank=True)

    is_master = models.BooleanField(default=False)
    master_id = models.CharField(max_length=100, blank=True)  # deprecated, use prototype_id instead

    prototype = models.ForeignKey(
        'EventPrototype',
        on_delete=models.PROTECT,
        related_name='all_events',
        null=True, blank=True,
    )

    visitors = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )  # not Integer, because it can take values such as 'no_record' or 'cancelled'

    asked_for_visitors = models.DateTimeField(null=True, blank=True)

    event_type = models.CharField(max_length=40, default="unknown")

    vk_group = models.CharField(max_length=40, blank=True)
    fb_group = models.CharField(max_length=40, blank=True)

    image = models.CharField(max_length=32, null=True, blank=True)
    vk_image = models.CharField(max_length=32, null=True, blank=True)

    ready_to_post = models.BooleanField(default=False)

    # (move these to event_announcements)
    posted_fb = models.CharField(max_length=1024, blank=True)
    posted_timepad = models.CharField(max_length=1024, blank=True)
    posted_vk = models.CharField(max_length=1024, blank=True)

    timepad_category_code = models.CharField(max_length=40, blank=True)
    timepad_prepaid_tickets = models.BooleanField(default=False)
    timing_description_override = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f'{timezone.localtime(self.start)} - {self.title}'

    @classmethod
    def by_id(cls, event_id):
        return Event.objects.get(pk=event_id)

    @classmethod
    def from_google(cls, google_event):
        obj = cls(
            created=parse_iso8601(google_event["created"]),
            updated=parse_iso8601(google_event["updated"]),
            creator=google_event["creator"].get("email", "UNKNOWN"),
            title=google_event.get("summary", ""),
            description=google_event.get("description", ""),
            start=parse_iso8601(google_event["start"]["dateTime"]),
            end=parse_iso8601(google_event["end"]["dateTime"]),
            location=google_event.get("location", ""),
            google_id=google_event["id"],
            google_link=google_event["htmlLink"],
            is_master=("recurrence" in google_event),
            master_id=google_event.get("recurringEventId", ""),
        )

        return obj

    def get_room(self):
        maybe_long_location = kocherga.room.from_long_location(self.location)
        if maybe_long_location:
            return maybe_long_location

        if self.location.strip():
            room = kocherga.room.normalize(self.location, fail=False)
            return room or kocherga.room.unknown

        # TODO - move to kocherga.room.look_for_room_in_string(...)?
        for room in kocherga.room.all_rooms:
            if room in self.title.lower():
                return (
                    room
                )  # TODO - check that the title is not something like "Кто-то лекционная или ГЭБ"

        return kocherga.room.unknown

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
                raise NotImplementedError

            if not image_id:
                continue

            url = settings.KOCHERGA_API_ROOT + f"/images/{image_id}"
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
            raise NotImplementedError
        self.save()

    def fb_announce_page(self):
        if self.fb_group:
            return f"https://www.facebook.com/groups/{self.fb_group}"
        else:
            return settings.KOCHERGA_FB["main_page"]["announce_page"]

    @property
    def timing_description(self):
        if self.timing_description_override:
            return self.timing_description_override

        start = timezone.localtime(self.start)
        return "Встреча пройдёт в {weekday} {day} {month}, в {time},".format(
            weekday=inflected_weekday(start),
            day=start.day,
            month=inflected_month(start),
            time=start.strftime("%H:%M"),
        )

    # overrides django method, but that's probably ok
    def delete(self, update_google=True):
        self.deleted = True
        if update_google:
            self.patch_google()
        self.save()

    def to_google(self):
        def convert_dt(dt):
            return dt.astimezone(tzutc()).strftime("%Y-%m-%dT%H:%M:%S.%fZ")

        result = {
            "created": convert_dt(self.created),
            "updated": convert_dt(self.updated),
            "creator": {"email": self.creator},
            "summary": self.title,
            "description": self.description,
            "location": self.location,
            "start": {"dateTime": convert_dt(self.start)},
            "end": {"dateTime": convert_dt(self.end)},
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
            for tag in self.tags.all()
        ]

    def add_tag(self, tag_name):
        if tag_name in self.tag_names():
            raise Exception(f"Tag {tag_name} already exists on this event")
        Tag.objects.create(name=tag_name, event=self)

    def delete_tag(self, tag_name):
        self.tags.get(name=tag_name).delete()

    def set_attendees(self, attendees):
        # Attendees not stored anywhere yet - used in .booking to pass to google.
        # TODO: store attendees in related event_attendees table.
        self._attendees = attendees

    @property
    def attendees(self):
        return getattr(self, '_attendees', [])

    def timepad_event(self):
        timepad_link = self.posted_timepad
        if not timepad_link:
            raise Exception("Event is not posted to timepad")

        return TimepadEvent.objects.get_by_link(timepad_link)

    def registered_users(self):
        """
        Uses timepad to determine who registered to the event.

        Unrelated to the `Event.attendees` method.
        """

        timepad_event = self.timepad_event()
        for order in timepad_event.orders.filter(status='ok'):
            yield order.user


class Tag(models.Model):
    class Meta:
        db_table = "event_tags"
        unique_together = (
            ('event', 'name'),
        )
        verbose_name = 'Тег'
        verbose_name_plural = 'Теги'

    id = models.AutoField(primary_key=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name='tags')

    name = models.CharField(max_length=40)
