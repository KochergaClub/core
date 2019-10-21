import logging
logger = logging.getLogger(__name__)

from datetime import datetime

from django.db import models
from wagtail.admin.edit_handlers import FieldPanel

from kocherga.dateutils import dts, TZ
import kocherga.google

from .google_event import GoogleEvent


def google_api():
    return kocherga.google.service("calendar")


def event_to_google_dict(event):
    return {
        "summary": event.title,
        "description": event.description,
        "location": event.location,
        "start": {"dateTime": dts(event.start)},
        "end": {"dateTime": dts(event.end)},
    }


class GoogleCalendarManager(models.Manager):
    pass
    # TODO - create calendar through api automatically or at least check access


class GoogleCalendar(models.Model):
    """
    Represents a single Google Calendar.

    The usual setup needs at most two calendars:
    1) Public calendar for all public events (for embedding on the website, etc.)
    2) Full calendar - for internal usage and for inviting visitors into their private booking events.
    """

    calendar_id = models.CharField(max_length=100, db_index=True)
    public_only = models.BooleanField(default=True)

    objects = GoogleCalendarManager()

    def should_export(self, event) -> bool:
        if self.public_only:
            # This condition is copy-pasted from Event.objects.public_events.
            return (
                event.event_type == 'public'
                and event.vk_announcement.link
                and event.start > datetime(2018, 6, 1, tzinfo=TZ)
            )
        return True

    def export_event(self, event):
        google_dict = event_to_google_dict(event)
        should_export = self.should_export(event)

        try:
            google_event = event.google_events.get(event=event, google_calendar=self)
            logger.info(f'Updating event {event.pk} -> {google_event.google_id}')

            if event.deleted:
                google_dict['status'] = 'cancelled'

            if should_export:
                google_api().events().patch(
                    calendarId=self.calendar_id,
                    eventId=google_event.google_id,
                    body=google_dict,
                ).execute()
            else:
                # Removing is not enough - we could accidentally export an event we want to hide completely.
                # (I haven't checked but `cancelled` events are probably still visible in some way.)
                google_api().events().delete(
                    calendarId=self.calendar_id,
                    eventId=google_event.google_id,
                ).execute()

        except GoogleEvent.DoesNotExist:
            if not should_export:
                return

            logger.info(f'Inserting event {event.pk}')

            result = google_api().events().insert(
                calendarId=self.calendar_id,
                sendNotifications=True,
                body=google_dict
            ).execute()

            GoogleEvent.objects.create(
                google_calendar=self,
                event=event,
                google_id=result['id'],
            )

    panels = [
        FieldPanel('calendar_id'),
        FieldPanel('public_only'),
    ]
