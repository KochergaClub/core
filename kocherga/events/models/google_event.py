from django.db import models


class GoogleEvent(models.Model):
    event = models.ForeignKey(
        'Event',
        on_delete=models.PROTECT,  # we never delete events anyway, so this shouldn't be a problem
        related_name='google_events',
    )
    google_calendar = models.ForeignKey(
        'GoogleCalendar',
        on_delete=models.CASCADE,
        related_name='google_events',
    )
    google_id = models.CharField(max_length=100, unique=True)
