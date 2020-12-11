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
        ticket = models.Ticket.objects.create(
            **input,
            training=training,
        )
        return ticket

    permissions = [user_perm('ratio.manage')]
    input = {
        'training': 'ID!',
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

        ticket.full_clean()
        ticket.save()
        return ticket

    permissions = [user_perm('ratio.manage')]
    input = {
        'id': 'ID!',
        'first_name': Optional[str],
        'last_name': Optional[str],
        'notion_link': Optional[str],
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


mutations = c.as_dict()
