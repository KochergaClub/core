from ariadne import ObjectType
from datetime import datetime, time

from kocherga.dateutils import TZ

from .. import models

My = ObjectType('My')


@My.field('tickets')
def resolve_tickets(obj, info, **pager):
    # TODO - move to models' manager
    qs = models.Ticket.objects.filter(
        user=info.context.user,
        # only future tickets are supported for now
        event__start__gte=datetime.combine(datetime.today().date(), time.min, tzinfo=TZ),
        status='ok'
    )

    return qs.relay_page(**pager, order='event__start')
