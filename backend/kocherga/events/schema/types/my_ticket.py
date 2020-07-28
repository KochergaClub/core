from typing import Optional

from kocherga.graphql import g, helpers

from .event import Event


MyEventsTicket = g.ObjectType(
    'MyEventsTicket',
    g.fields(
        {
            'id': g.Field(g.NN(g.ID), resolve=lambda obj, info: obj.event.uuid),
            'event': g.NN(Event),
            'status': str,
            'created': Optional[str],
            'zoom_link': Optional[str],
        }
    ),
)

MyEventsTicketConnection = helpers.ConnectionType(MyEventsTicket)
