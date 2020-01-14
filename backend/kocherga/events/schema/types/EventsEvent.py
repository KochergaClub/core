from kocherga.graphql.types import DjangoObjectType

from ...import models

EventsEvent = DjangoObjectType('EventsEvent', models.Event)

EventsEvent.set_alias('event_id', 'uuid')

EventsEvent.related_field('tickets')
