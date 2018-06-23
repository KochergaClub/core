import logging
logger = logging.getLogger(__name__)

from datetime import datetime, timedelta
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime

from .event import Event

from kocherga.db import Session, Base
from kocherga.config import TZ
import kocherga.events.google

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

    def instances(self):
        events = Session().query(Event).filter(Event.prototype_id == self.prototype_id).all()
        return events

    def suggested_dates(self, until=None, limit=10):
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
                for prop in ('title', 'summary', 'description')
            }
        )

        # Event constructor doesn't understand all props
        for prop in ('vk_group', 'fb_group'):
            setattr(tmp_event, prop, getattr(self, prop))

        google_event = kocherga.events.google.insert_event(
            tmp_event.to_google()
        )
        event = Event.from_google(google_event)
        Session().add(event) # don't forget to commit!

    def cancel_event(self, dt):
        raise NotImplemented # mark an event as cancelled (in a separate table)
