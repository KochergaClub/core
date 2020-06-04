from kocherga.graphql.types import DjangoObjectType

from ... import models

EventsGoogleCalendar = DjangoObjectType('EventsGoogleCalendar', models.GoogleCalendar)
