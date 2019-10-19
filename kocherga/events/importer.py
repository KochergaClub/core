import logging
logger = logging.getLogger(__name__)

from typing import List, Dict, Any
from datetime import datetime, timedelta

from kocherga.dateutils import TZ
import kocherga.importer.base

from .models import Event


class Importer(kocherga.importer.base.IncrementalImporter):

    def get_initial_dt(self):
        return datetime(2015, 8, 1, tzinfo=TZ)

    def load_updated_google_events(self, from_dt: datetime) -> List[Dict[str, Any]]:
        google_events = None
        too_old = from_dt < datetime.now(tz=TZ) - timedelta(days=7)
        if too_old:
            logger.info(f"from_dt = {from_dt} is too old, let's reimport everything")
            google_events = kocherga.events.google.list_events(
                to_date=(datetime.now(tz=TZ) + timedelta(days=7 * 8)).date(),
                deleted=True,
            )
        else:
            google_events = kocherga.events.google.list_events(
                to_date=(datetime.now(tz=TZ) + timedelta(days=7 * 8)).date(),
                order_by="updated",
                updated_min=from_dt,
                deleted=True,
            )
        return google_events

    def update_or_create_event(self, event):
        try:
            existing_event = Event.objects.get(google_id=event.google_id)
            logger.debug(f'Event {event.google_id}, title {event.title} - existing')
            for prop in ('title', 'description', 'location', 'start', 'end', 'updated'):
                setattr(existing_event, prop, getattr(event, prop))
            existing_event.save()
        except Event.DoesNotExist:
            logger.debug(f'Event {event.google_id}, title {event.title} - new')
            event.save()

    def cancel_event_by_id(self, google_id):
        try:
            event = Event.objects.get(google_id=google_id)
            event.delete(update_google=False)
        except Event.DoesNotExist:
            logger.info(f"Couldn't cancel event {google_id} - not found, probably wasn't imported in time")

    def do_period_import(self, from_dt: datetime, to_dt: datetime) -> datetime:
        google_events = self.load_updated_google_events(from_dt)

        last_dt = from_dt
        for google_event in google_events:
            if google_event['status'] == 'cancelled':
                self.cancel_event_by_id(google_event['id'])
                continue

            imported_event = Event.from_google(google_event)
            last_dt = max(last_dt, imported_event.updated)
            self.update_or_create_event(imported_event)

        return last_dt

    def interval(self):
        return {"minutes": 1}
