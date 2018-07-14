import logging
logger = logging.getLogger(__name__)

from typing import List

from datetime import datetime, timedelta
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, inspect
from sqlalchemy.ext.hybrid import hybrid_property

from .event import Event

from kocherga.db import Session, Base
from kocherga.config import TZ
import kocherga.events.google
from kocherga.datetime import dts

class EventPrototype(Base):
    __tablename__ = "event_prototypes"

    prototype_id = Column(Integer, primary_key=True)

    title = Column(String(255))
    location = Column(String(255))
    summary = Column(Text, nullable=False, default='')
    description = Column(Text, nullable=False, default='')

    vk_group = Column(String(40))
    fb_group = Column(String(40))

    weekday = Column(Integer)
    hour = Column(Integer)
    minute = Column(Integer)
    length = Column(Integer) # in minutes

    active = Column(Boolean)

    _canceled_dates = Column('canceled_dates', Text)

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

        for prop in ('summary', 'vk_group', 'fb_group'):
            setattr(event, prop, getattr(self, prop))
        event.prototype_id = self.prototype_id

        Session().add(event) # don't forget to commit!
        return event

    @hybrid_property
    def canceled_dates(self):
        if not self._canceled_dates:
            return []
        return [datetime.strptime(d, '%Y-%m-%d').date() for d in self._canceled_dates.split(',')]

    @canceled_dates.setter
    def canceled_dates(self, value):
        self._canceled_dates = ','.join([
            d.strftime('%Y-%m-%d')
            for d in value # TODO - filter out past dates which we don't care about anymore?
        ])

    def cancel_date(self, d):
        self.canceled_dates = self.canceled_dates + [d]

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
