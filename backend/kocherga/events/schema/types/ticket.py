from kocherga.graphql import g

from kocherga.auth.schema.types import AuthUser

EventsTicket = g.ObjectType(
    'EventsTicket', g.fields({'id': 'ID!', 'status': str, 'user': g.NN(AuthUser)})
)
