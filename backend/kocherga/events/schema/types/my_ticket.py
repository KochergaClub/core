from typing import Optional

from kocherga.graphql import g, helpers

from .event import EventsPublicEvent


# type MyEventsTicket {
#   event: EventsPublicEvent!
#   status: String!
#   created: String
#   zoom_link: String
# }
MyEventsTicket = g.ObjectType(
    'MyEventsTicket',
    g.fields(
        {
            'id': g.Field(g.NN(g.ID), resolve=lambda obj, info: obj.event.uuid),
            'event': g.NN(EventsPublicEvent),
            'status': str,
            'created': Optional[str],
            'zoom_link': Optional[str],
        }
    ),
)

MyEventsTicketConnection = helpers.ConnectionType(MyEventsTicket)
