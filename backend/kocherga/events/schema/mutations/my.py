from typing import Optional

from django.contrib.auth import get_user_model
from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import authenticated

from ... import models
from ..types import MyEventsTicket

c = helpers.Collection()


@c.class_field
class myEventsTicketUnregister(helpers.BaseField):
    permissions = [authenticated]
    args = {'event_id': 'ID!'}
    result = g.NN(MyEventsTicket)

    def resolve(self, _, info, event_id):
        event = models.Event.objects.public_only().get(uuid=event_id)
        ticket = models.Ticket.objects.unregister(user=info.context.user, event=event)
        return ticket


@c.class_field
class myEventsTicketRegister(helpers.BaseField):
    permissions = [authenticated]
    args = {'event_id': 'ID!'}
    result = g.NN(MyEventsTicket)

    def resolve(self, _, info, event_id):
        event = models.Event.objects.public_only().get(uuid=event_id)
        ticket = models.Ticket.objects.register(
            user=info.context.user, event=event, signed_in=True
        )
        return ticket


@c.class_field
class myEventsTicketRegisterAnon(helpers.BaseFieldWithInput):
    permissions = []
    input = {
        'event_id': 'ID!',
        'email': str,
        'subscribed_to_newsletter': Optional[bool],
    }

    result = g.NN(MyEventsTicket)

    def resolve(self, _, info, input):
        event_id = input['event_id']
        email = input['email']
        subscribed_to_newsletter = input.get('subscribed_to_newsletter', False)

        KchUser = get_user_model()
        try:
            user = KchUser.objects.get(email=email)
        except KchUser.DoesNotExist:
            user = KchUser.objects.create_user(email)

        event = models.Event.objects.public_only().get(uuid=event_id)
        ticket = models.Ticket.objects.register(
            user=user,
            event=event,
            subscribed_to_newsletter=subscribed_to_newsletter,
            signed_in=False,
        )
        return ticket


mutations = c.as_dict()
