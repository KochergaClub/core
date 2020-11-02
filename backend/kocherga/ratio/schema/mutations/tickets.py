from typing import Optional

from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import user_perm

from .. import types
from ... import models


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
        'first_name': str,
        'last_name': Optional[str],
        'payment_amount': int,
        'ticket_type': Optional[str],
        'comment': Optional[str],
    }

    result = g.NN(types.RatioTicket)


mutations = c.as_dict()
