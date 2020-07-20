from kocherga.graphql import django_utils

from ... import models

EventsGoogleCalendar = django_utils.DjangoObjectType(
    'EventsGoogleCalendar',
    model=models.GoogleCalendar,
    db_fields=['id'],
    extra_fields={'url': str},
)
