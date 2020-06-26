import logging

logger = logging.getLogger(__name__)

from datetime import datetime

from django.db import models
from wagtail.admin.edit_handlers import FieldPanel

from kocherga.dateutils import dts, TZ
import kocherga.room

from kocherga.events.google import api as google_api
import kocherga.events.markup
from .google_event import GoogleEvent
from .event import Event


def event_to_google_dict(event):
    description = kocherga.events.markup.Markup(event.description or '').as_plain()
    if event.event_type == 'public':
        description = event.public_link() + "\n\n" + description

    result = {
        "summary": event.title,
        "description": description,
        "start": {"dateTime": dts(event.start)},
        "end": {"dateTime": dts(event.end)},
        "status": "confirmed",
    }
    if event.realm == 'offline':
        location = event.location

        if location.lower() in kocherga.room.all_rooms:
            location = kocherga.room.to_long_location(location)

        result['location'] = location

    if event.invite_creator:
        # TODO - this could lead to multiple invites if we create several full calendars.
        # Need to figure out how to avoid such problem.
        result['attendees'] = [{"email": event.creator}]

    return result


class GoogleCalendarManager(models.Manager):
    def get_public_calendar(self):
        try:
            return self.get(public_only=True)
        except GoogleCalendar.DoesNotExist:
            return None

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

    def __str__(self):
        return self.calendar_id + (' (public)' if self.public_only else ' (private)')

    def should_export(self, event) -> bool:
        if self.public_only:
            # This condition is adapted from Event.objects.public_events.
            return (
                event.event_type == 'public'
                and event.published
                and event.start > datetime(2018, 6, 1, tzinfo=TZ)
            )
        return True

    def export_all_events(self):
        for event in Event.objects.all():
            self.export_event(event)

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
                    calendarId=self.calendar_id, eventId=google_event.google_id,
                ).execute()
                google_event.delete()

        except GoogleEvent.DoesNotExist:
            if not should_export:
                logger.info(f"Shouldn't export {event.pk} to {self.pk}")
                return

            logger.info(f'Inserting event {event.pk}')

            result = (
                google_api()
                .events()
                .insert(
                    calendarId=self.calendar_id,
                    sendNotifications=True,
                    body=google_dict,
                )
                .execute()
            )

            GoogleEvent.objects.create(
                google_calendar=self, event=event, google_id=result['id'],
            )

    @property
    def url(self):
        return f"https://calendar.google.com/calendar/r?cid={self.calendar_id}"

    panels = [
        FieldPanel('calendar_id'),
        FieldPanel('public_only'),
    ]
