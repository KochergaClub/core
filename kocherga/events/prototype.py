import logging
logger = logging.getLogger(__name__)

from datetime import datetime, timedelta
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, inspect

from .event import Event

from kocherga.db import Session, Base
from kocherga.config import TZ
import kocherga.events.google
from kocherga.datetime import dts

class EventCancelled(Base):
    __tablename__ = "events_cancelled"

    prototype_id = Column(Integer, primary_key=True, autoincrement=False)
    start = Column(DateTime)

class EventPrototype(Base):
    __tablename__ = "event_prototypes"

    prototype_id = Column(Integer, primary_key=True)

    title = Column(String(255))
    summary = Column(Text)
    description = Column(Text)

    vk_group = Column(String(40))
    fb_group = Column(String(40))

    weekday = Column(Integer)
    hour = Column(Integer)
    minute = Column(Integer)
    length = Column(Integer) # in minutes

    active = Column(Boolean)

    def instances(self, limit=None):
        query = Session().query(Event).filter_by(prototype_id=self.prototype_id).order_by(Event.start_ts.desc())
        if limit:
            query = query.limit(limit)
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

        result = []
        while len(result) < limit:
            if until and dt > until:
                break

            if dt not in existing_dts:
                result.append(dt)

            dt += timedelta(weeks=1)

        return result

    def new_event(self, dt):
        tmp_event = Event(
            start_dt=dt,
            end_dt=dt + timedelta(minutes=self.length),
            **{
                prop: getattr(self, prop)
                for prop in ('title', 'description')
            }
        )

        google_event = kocherga.events.google.insert_event(
            tmp_event.to_google()
        )
        event = Event.from_google(google_event)

        for prop in ('summary', 'vk_group', 'fb_group'):
            setattr(event, prop, getattr(self, prop))
        event.prototype_id = self.prototype_id

        Session().add(event) # don't forget to commit!
        return event

    def cancel_event(self, dt):
        raise NotImplemented # mark an event as cancelled (in a separate table)

    def to_dict(self, detailed=False):
        columns = inspect(self).attrs.keys()
        result = {
            column: getattr(self, column)
            for column in columns
        }

        if detailed:
            result['suggested'] = [dts(dt) for dt in self.suggested_dates(limit=5)]
            result['instances'] = [e.to_dict() for e in self.instances(limit=5)]

        return result
