import logging
logger = logging.getLogger(__name__)

from typing import List

from datetime import datetime, timedelta

from django.db import models

from .event import Event
from .prototype_tag import EventPrototypeTag

from kocherga.config import TZ
import kocherga.config
import kocherga.events.google
from kocherga.datetime import dts
from kocherga.images import image_storage

class EventPrototype(models.Model):
    class Meta:
        db_table = 'event_prototypes'
        managed = False

    prototype_id = models.IntegerField(primary_key=True)

    title = models.CharField(max_length=255)
    location = models.CharField(max_length=255, blank=True)
    summary = models.TextField(blank=True)
    description = models.TextField(blank=True)

    timepad_category_code = models.CharField(max_length=40, blank=True)
    timepad_prepaid_tickets = models.BooleanField(default=False)
    timing_description_override = models.CharField(max_length=255, blank=True)

    vk_group = models.CharField(max_length=40, blank=True)
    fb_group = models.CharField(max_length=40, blank=True)

    weekday = models.IntegerField()
    hour = models.IntegerField()
    minute = models.IntegerField()
    length = models.IntegerField() # in minutes

    image = models.CharField(max_length=32, null=True)

    active = models.BooleanField(default=True)

    canceled_dates = models.TextField()

    @classmethod
    def by_id(cls, prototype_id):
        return EventPrototype.objects.get(id=prototype_id)

    def instances(self, limit=None):
        query = Event.objects.filter(prototype_id=self.prototype_id, deleted=False).order_by('-start_ts')
        if limit:
            query = query[:limit]
        events = query.all()
        return events

    def suggested_dates(self, until=None, limit=5):
        now = datetime.now(tz=TZ)

        dt = now - timedelta(days=now.weekday())
        dt += timedelta(days=self.weekday)
        dt = dt.replace(hour=self.hour, minute=self.minute, second=0, microsecond=0)

        if dt < now:
            dt += timedelta(weeks=1)

        existing_dts = set(
            e.start_dt
            for e in self.instances()
        )

        result: List[datetime] = []
        while len(result) < limit:
            if until and dt > until:
                break

            if dt not in existing_dts and dt.date() not in self.canceled_dates:
                result.append(dt)

            dt += timedelta(weeks=1)

        return result

    def new_event(self, dt):
        tmp_event = Event(
            start_dt=dt,
            end_dt=dt + timedelta(minutes=self.length),
            **{
                prop: getattr(self, prop)
                for prop in ('title', 'location', 'description')
            }
        )

        google_event = kocherga.events.google.insert_event(
            tmp_event.to_google()
        )
        event = Event.from_google(google_event)

        for prop in ('summary', 'vk_group', 'fb_group', 'timepad_prepaid_tickets', 'timepad_category_code', 'timing_description_override'):
            value = getattr(self, prop)
            if value is not None:
                event.set_field_by_prop(prop, value)

        event.prototype_id = self.prototype_id

        if self.image:
            event.image = self.image

        event.save()
        return event

    @property
    def canceled_dates_list(self):
        if not self.canceled_dates:
            return []
        return [datetime.strptime(d, '%Y-%m-%d').date() for d in self.canceled_dates.split(',')]

    def set_canceled_dates(self, value):
        self.canceled_dates = ','.join([
            d.strftime('%Y-%m-%d')
            for d in value # TODO - filter out past dates which we don't care about anymore?
        ])

    def cancel_date(self, d):
        self.set_canceled_dates(self.canceled_dates_list + [d])

    def image_file(self):
        return image_storage.get_filename(self.image)

    def to_dict(self, detailed=False):
        fields = EventPrototype._meta.get_fields()
        result = {}
        for field in fields:
            if field.name == 'image':
                if self.image:
                    result[field.name] = kocherga.config.web_root() + f"/images/{self.image}"
            else:
                result[field.name] = getattr(self, field.name)

        if detailed:
            result['suggested'] = [dts(dt) for dt in self.suggested_dates(limit=5)]
            result['instances'] = [e.to_dict() for e in self.instances(limit=20)]

        result["tags"] = self.tag_names()

        return result

    def add_image(self, fh):
        self.image = image_storage.add_file(fh)

    @property
    def tags(self):
        return list(self.tag_set.all())

    def tag_names(self):
        return [
            tag.name
            for tag in self.tags
        ]

    def add_tag(self, tag_name):
        if tag_name in self.tag_names():
            raise Exception(f"Tag {tag_name} already exists on this event prototype")
        self.tag_set.add(EventPrototypeTag(name=tag_name))

    def delete_tag(self, tag_name):
        self.tag_set.remove(next(tag for tag in self.tags if tag.name == tag_name))
