from typing import Optional

from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import user_perm

from ... import models
from .. import types

c = helpers.Collection()


@c.class_field
class ratioAddTicket(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        training_id = input.pop('training')
        training = models.Training.objects.get(pk=training_id)

        ticket_type_id = input.pop('ticket_type', None)
        ticket_type = None
        if ticket_type_id:
            ticket_type = models.TicketType.objects.get(uuid=ticket_type_id)

        ticket = models.Ticket.objects.create(
            **input,
            training=training,
            ticket_type=ticket_type,
        )
        return ticket

    permissions = [user_perm('ratio.manage')]
    input = {
        'training': 'ID!',  # TODO - remove and derive from ticket_type
        'ticket_type': 'ID',  # TODO - required
        'email': str,
        'first_name': Optional[str],
        'last_name': Optional[str],
        'payment_amount': int,
        'ticket_class': Optional[str],
        'comment': Optional[str],
    }

    result = g.NN(types.RatioTicket)


@c.class_field
class updateRatioTicket(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        ticket = models.Ticket.objects.get(pk=input['id'])

        for field in (
            'first_name',
            'last_name',
            'notion_link',
        ):
            if input.get(field) is not None:
                setattr(ticket, field, input[field])

        if input.get('ticket_type') is not None:
            ticket_type_id = input['ticket_type']
            ticket_type = models.TicketType.objects.get(uuid=ticket_type_id)
            ticket.ticket_type = ticket_type

        ticket.full_clean()
        ticket.save()
        return ticket

    permissions = [user_perm('ratio.manage')]
    input = {
        'id': 'ID!',
        'first_name': Optional[str],
        'last_name': Optional[str],
        'notion_link': Optional[str],
        'ticket_type': 'ID',
    }

    result = g.NN(types.RatioTicket)


@c.class_field
class setRatioTicketNotionLink(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        ticket = models.Ticket.objects.get(pk=input['id'])

        ticket.set_notion_link(input['notion_link'])
        return ticket

    permissions = [user_perm('ratio.manage')]
    input = {
        'id': 'ID!',
        'notion_link': str,
    }

    result = g.NN(types.RatioTicket)


@c.class_field
class replaceRatioTicketNotionLink(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        ticket = models.Ticket.objects.get(pk=input['id'])

        ticket.replace_notion_link(input['notion_link'], input['send_email'])
        return ticket

    permissions = [user_perm('ratio.manage')]
    input = {
        'id': 'ID!',
        'notion_link': str,
        'send_email': bool,
    }

    result = g.NN(types.RatioTicket)


mutations = c.as_dict()
