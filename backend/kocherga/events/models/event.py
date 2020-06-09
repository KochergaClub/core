import logging
logger = logging.getLogger(__name__)

import base64
import uuid
import re

import dateutil.parser
from datetime import datetime, time

from asgiref.sync import async_to_sync
import channels.layers

from django.db import models, transaction
from django.conf import settings
from django.utils import timezone

from kocherga.dateutils import TZ, inflected_weekday, inflected_month
from kocherga.django.managers import RelayQuerySetMixin

import kocherga.room
import kocherga.zoom.models

import kocherga.events.markup
from kocherga.events.helpers import create_image_from_fh

from kocherga.timepad.models import Event as TimepadEvent


def parse_iso8601(s):
    return dateutil.parser.parse(s).astimezone(TZ)


def ts_now():
    return datetime.now(TZ).timestamp()


class EventQuerySet(RelayQuerySetMixin, models.QuerySet):
    pass


class EventManager(models.Manager):
    def get_queryset(self):
        return EventQuerySet(self.model, using=self._db)

    def notify_update(self):
        def send_update():
            async_to_sync(channels.layers.get_channel_layer().group_send)(
                'events_group', {
                    'type': 'notify.update',
                }
            )
        transaction.on_commit(send_update)

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
            self.get_queryset()
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
        query = self.list_events(date=date, from_date=from_date, to_date=to_date)

        query = (
            query
            # public events can contain raw description initially, so we rely on `published` flag
            .filter(event_type = 'public', published = True)
            # earlier events are not cleaned up yet
            .filter(start__gte = datetime(2018, 6, 1, tzinfo=TZ))
        )

        if tag:
            query = query.filter(tags__name = tag)

        return query


def generate_uuid():
    return base64.b32encode(uuid.uuid4().bytes)[:26].lower().decode('ascii')


class Event(models.Model):
    class Meta:
        db_table = "events"
        verbose_name = 'Событие'
        verbose_name_plural = 'События'

    objects = EventManager()

    uuid = models.SlugField(default=generate_uuid, unique=True)

    start = models.DateTimeField(db_index=True)
    end = models.DateTimeField(db_index=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    creator = models.CharField(max_length=255, null=True, blank=True)

    invite_creator = models.BooleanField(default=False)

    title = models.CharField(max_length=255)

    # Not a google_event.summary!
    # This is for the short schedule/timepad/email summaries.
    summary = models.TextField(blank=True)

    description = models.TextField(blank=True)

    deleted = models.BooleanField(default=False)

    location = models.CharField(max_length=255, blank=True)

    prototype = models.ForeignKey(
        'EventPrototype',
        on_delete=models.PROTECT,
        related_name='all_events',
        null=True, blank=True,
    )

    project = models.ForeignKey(
        'projects.ProjectPage',
        on_delete=models.SET_NULL,
        related_name='events',
        null=True, blank=True,
    )

    visitors = models.CharField(
        max_length=100,
        blank=True,
        null=True
    )  # not Integer, because it can take values such as 'no_record' or 'cancelled'

    asked_for_visitors = models.DateTimeField(null=True, blank=True)

    event_type = models.CharField(
        max_length=40,
        choices=[
            (x, x)
            for x in ('public', 'private', 'unknown')
        ],
        default="unknown"
    )

    registration_type = models.CharField(
        max_length=20,
        choices=[
            (x, x)
            for x in ('native', 'timepad')
        ],
        default='native'
    )

    pricing_type = models.CharField(
        max_length=20,
        choices=[
            (x, x)
            for x in ('anticafe', 'free')
        ],
        default='free'
    )

    realm = models.CharField(
        max_length=40,
        choices=[
            (x, x)
            for x in ('offline', 'online')
        ],
        default='online',
    )

    zoom_link = models.URLField(
        blank=True,
        max_length=255,
    )
    zoom_meeting = models.OneToOneField(
        kocherga.zoom.models.Meeting,
        related_name='events',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    image = models.ForeignKey(
        'kocherga_wagtail.CustomImage',
        null=True,
        blank=True,
        on_delete=models.PROTECT,
        related_name='+'
    )

    published = models.BooleanField(default=False)
    timing_description_override = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f'{timezone.localtime(self.start)} - {self.title}'

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

    def add_image(self, fh):
        self.image = create_image_from_fh(
            fh,
            title=self.title,
            basename=f'event-image-{self.uuid}',
        )
        self.save()

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
    def delete(self):
        self.deleted = True
        async_to_sync(channels.layers.get_channel_layer().group_send)(
            'event_updates', {
                'type': 'event.deleted',
                'uuid': self.uuid,
            }
        )
        self.save()

    def save(self, *args, **kwargs):
        adding = not bool(self.pk)
        super().save(*args, **kwargs)

        if not self.deleted:
            logger.info('sending event_updates notification')
            layer = channels.layers.get_channel_layer()

            async_to_sync(layer.group_send)(
                'event_updates', {
                    'type': 'event.created' if adding else 'event.updated',
                    'uuid': self.uuid,
                }
            )

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

    def timepad_event(self):
        timepad_link = self.timepad_announcement.link
        if not timepad_link:
            raise Exception("Event is not posted to timepad")

        return TimepadEvent.objects.get_by_link(timepad_link)

    def registered_users(self):
        """
        Uses timepad to determine who registered to the event.
        """
        # TODO - modify to use the native tickets system.

        timepad_event = self.timepad_event()
        for order in timepad_event.orders.filter(status__in=['ok', 'paid']):
            yield order.user

    def public_link(self):
        return f'{settings.KOCHERGA_WEBSITE}/events/{self.uuid}'

    def set_zoom_link(self, link):
        assert not self.deleted
        assert self.realm == 'online'
        self.zoom_link = link
        self.full_clean()
        self.save()

    def generate_zoom_link(self):
        assert not self.deleted
        assert self.realm == 'online'
        zoom_meeting = kocherga.zoom.models.Meeting.objects.schedule(
            topic = self.title + ' | Кочерга',
            start_dt = self.start,
            duration = int((self.end - self.start).total_seconds() / 60),
        )
        self.zoom_meeting = zoom_meeting
        self.set_zoom_link(zoom_meeting.join_url)

    def detect_zoom_meeting_from_zoom_link(self):
        """
        Temporary method for migrating from event.zoom_link to event.zoom_meeting.
        """
        if not self.zoom_link:
            return  # nothing to do

        match = re.match(r'https://(?:\w+.)?zoom.us/j/(\d+)', self.zoom_link)
        if not match:
            raise Exception(f"Strange zoom_link: {self.zoom_link}")

        self.zoom_meeting = kocherga.zoom.models.Meeting.objects.filter(
            zoom_id=match.group(1)
        ).order_by('-duration').first()

        self.save()

    def move(self, start: datetime):
        self.end = self.end + (start - self.start)
        self.start = start
        self.full_clean()
        self.save()

    def clean(self):
        if self.published:
            if self.event_type != 'public':
                raise Exception("Only public events can be published")
            if self.realm == 'online' and not self.zoom_link:
                raise Exception("zoom_link must be set when publishing online events")


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
