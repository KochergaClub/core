from ariadne import ObjectType
from datetime import datetime, time

from kocherga.dateutils import TZ

from .. import models

My = ObjectType('My')


@My.field('tickets')
def resolve_tickets(obj, info):
    # TODO - move to models' manager
    qs = models.Ticket.objects.filter(
        user=info.context.user,
        # only future event tickets
        event__start__gte=datetime.combine(datetime.today().date(), time.min, tzinfo=TZ),
        status='ok'
    )
    return qs.all()
