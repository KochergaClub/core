import logging
logger = logging.getLogger(__name__)

from typing import List

from datetime import datetime, timedelta

from django.db import models
import reversion

from kocherga.dateutils import TZ

from .event import Event
from ..helpers import create_image_from_fh
from .announcement.timepad import timepad_category_by_code


@reversion.register()
class EventPrototype(models.Model):
    class Meta:
        db_table = 'event_prototypes'
        verbose_name = 'Прототип события'
        verbose_name_plural = 'Прототипы событий'

    prototype_id = models.AutoField(primary_key=True)

    project = models.ForeignKey(
        'projects.ProjectPage',
        on_delete=models.SET_NULL,
        related_name='+',
        null=True, blank=True,
    )

    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True)
    summary = models.TextField(blank=True)
    description = models.TextField(blank=True)

    timing_description_override = models.CharField(max_length=255, blank=True)

    # These properties are located in event.TYPE_announcement.PROP on the event's instance,
    # but we store them directly in prototype model for the sake of simplicity and for legacy reasons.
    vk_group = models.CharField(max_length=40, blank=True)
    fb_group = models.CharField(max_length=40, blank=True)
    timepad_category_code = models.CharField(max_length=40, blank=True)
    timepad_prepaid_tickets = models.BooleanField(default=False)

    weekday = models.IntegerField()
    hour = models.IntegerField()
    minute = models.IntegerField()
    length = models.IntegerField()  # in minutes

    image = models.ForeignKey(
        'kocherga_wagtail.CustomImage',
        null=True,
        blank=True,
        on_delete=models.PROTECT,
        related_name='+'
    )

    active = models.BooleanField(default=True)

    canceled_dates = models.TextField(blank=True)

    def __str__(self):
        return self.title

    @classmethod
    def by_id(cls, prototype_id):
        return EventPrototype.objects.get(pk=prototype_id)

    @property
    def timepad_category(self):
        if not self.timepad_category_code:
            return None
        return timepad_category_by_code(self.timepad_category_code)

    # This is a legacy method, we should replace it with all_events() from Event's FK.
    # But that method for now doesn't allow limiting, doesn't filter out deleted events and doesn't apply `order_by`.
    def instances(self, limit=None):
        query = Event.objects.filter(prototype_id=self.prototype_id, deleted=False).order_by('-start')
        if limit:
            query = query[:limit]
        events = query.all()
        return events

    def suggested_dates(self, until=None, limit=5):
        if not self.active:
            return []
        now = datetime.now(tz=TZ)

        dt = now - timedelta(days=now.weekday())
        dt += timedelta(days=self.weekday)
        dt = dt.replace(hour=self.hour, minute=self.minute, second=0, microsecond=0)

        if dt < now:
            dt += timedelta(weeks=1)

        existing_dts = set(
            e.start
            for e in self.instances()
        )

        result: List[datetime] = []
        while len(result) < limit:
            if until and dt > until:
                break

            if dt not in existing_dts and dt.date() not in self.canceled_dates_list:
                result.append(dt)

            dt += timedelta(weeks=1)

        return result

    def new_event(self, dt):
        event = Event(
            start=dt,
            end=dt + timedelta(minutes=self.length),
            **{
                prop: getattr(self, prop)
                for prop in ('title', 'location', 'description')
            }
        )

        event.save()

        for prop in (
                'summary',
                'timing_description_override',
        ):
            value = getattr(self, prop)
            if value is not None:
                setattr(event, prop, value)  # FIXME - this is evil, should we use serializer instead?

        event.prototype = self
        event.project = self.project

        if self.image:
            event.image = self.image

        event.full_clean()
        event.save()

        if self.vk_group:
            event.vk_announcement.group = self.vk_group
            event.vk_announcement.save()

        if self.fb_group:
            event.fb_announcement.group = self.fb_group
            event.fb_announcement.save()

        if self.timepad_prepaid_tickets or self.timepad_category_code:
            event.timepad_announcement.prepaid_tickets = self.timepad_prepaid_tickets
            event.timepad_announcement.category_code = self.timepad_category_code
            event.timepad_announcement.save()

        return event

    @property
    def canceled_dates_list(self):
        if not self.canceled_dates:
            return []
        return [datetime.strptime(d, '%Y-%m-%d').date() for d in self.canceled_dates.split(',')]

    def set_canceled_dates(self, value):
        self.canceled_dates = ','.join([
            d.strftime('%Y-%m-%d')
            for d in value  # TODO - filter out past dates which we don't care about anymore?
        ])

    def cancel_date(self, d):
        self.set_canceled_dates(self.canceled_dates_list + [d])

    def add_image(self, fh):
        self.image = create_image_from_fh(
            fh,
            title=self.title,
            basename=f'prototype-{self.pk}',
        )
        self.save()

    def tag_names(self):
        return [
            tag.name
            for tag in self.tags.all()
        ]

    def add_tag(self, tag_name):
        if tag_name in self.tag_names():
            raise Exception(f"Tag {tag_name} already exists on this event prototype")
        tag = EventPrototypeTag(name=tag_name, prototype=self).save()
        return tag

    def delete_tag(self, tag_name):
        self.tags.get(name=tag_name).delete()


class EventPrototypeTag(models.Model):
    class Meta:
        db_table = 'event_prototype_tags'
        unique_together = (
            ('prototype', 'name'),
        )

    id = models.AutoField(primary_key=True)
    prototype = models.ForeignKey(EventPrototype, on_delete=models.CASCADE, related_name='tags')

    name = models.CharField(max_length=40)
