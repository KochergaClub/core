from datetime import datetime, time

from kocherga.graphql import g, helpers
from kocherga.graphql.decorators import auth
from kocherga.dateutils import TZ

from .. import models
from . import types

c = helpers.Collection()


# tickets(
#   before: String
#   after: String
#   first: Int
#   last: Int
# ): MyEventsTicketConnection! @auth(authenticated: true)
@c.field
def tickets(_):
    @auth(authenticated=True)
    def resolve(obj, info, **pager):
        # TODO - move to models' manager
        qs = models.Ticket.objects.filter(
            user=info.context.user,
            # only future tickets are supported for now
            event__start__gte=datetime.combine(
                datetime.today().date(), time.min, tzinfo=TZ
            ),
            status='ok',
        )

        return qs.relay_page(**pager, order='event__start')

    return helpers.ConnectionField(
        g.NN(types.MyEventsTicketConnection), resolve=resolve
    )


my_queries = c.as_dict()
