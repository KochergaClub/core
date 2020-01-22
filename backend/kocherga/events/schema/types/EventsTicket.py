from kocherga.graphql.types import DjangoObjectType

from ...import models

EventsTicket = DjangoObjectType('EventsTicket', models.Ticket)

EventsTicket.related_field('user')
