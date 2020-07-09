from kocherga.graphql import g, django_utils

from ... import models

EventsGoogleCalendar = g.ObjectType(
    'EventsGoogleCalendar',
    g.fields({**django_utils.model_fields(models.GoogleCalendar, ['id']), 'url': str}),
)
