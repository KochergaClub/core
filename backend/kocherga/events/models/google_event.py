from django.db import models
import reversion

from kocherga.events.google import api as google_api


class Manager(models.Manager):
    # needed for manual migration - GoogleEvent was missing html_link field at the beginning
    def populate_html_links(self):
        for event in self.filter(html_link=''):
            html_link = event.load_google_data()['htmlLink']
            event.html_link = html_link
            event.full_clean()
            event.save()


@reversion.register()
class GoogleEvent(models.Model):
    event = models.ForeignKey(
        'Event',
        on_delete=models.PROTECT,  # we never delete events anyway, so this shouldn't be a problem
        related_name='google_events',
    )
    google_calendar = models.ForeignKey(
        'GoogleCalendar', on_delete=models.CASCADE, related_name='google_events',
    )
    google_id = models.CharField(max_length=100, unique=True)

    html_link = models.URLField(blank=True)

    objects = Manager()

    def load_google_data(self):
        return (
            google_api()
            .events()
            .get(calendarId=self.google_calendar.calendar_id, eventId=self.google_id)
            .execute()
        )
