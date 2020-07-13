from datetime import datetime, time

from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import authenticated
from kocherga.dateutils import TZ

from .. import models
from . import types

c = helpers.Collection()


@c.class_field
class tickets(helpers.BaseField):
    permissions = [authenticated]
    args = helpers.connection_args()
    result = g.NN(types.MyEventsTicketConnection)

    def resolve(self, _, info, **pager):
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


my_queries = c.as_dict()
