from typing import Optional
from kocherga.graphql import g, helpers, basic_types
from kocherga.graphql.permissions import user_perm

from ... import models
from .. import types


c = helpers.Collection()


@c.class_field
class createRatioTicketType(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        training_id = input['training_id']

        training = models.Training.objects.get(pk=training_id)
        ticket_type = models.TicketType.objects.create(
            training=training,
            price=input['price'],
            name=input['name'],
        )
        ticket_type.full_clean()
        return ticket_type

    permissions = [user_perm('ratio.manage')]
    input = {
        'training_id': 'ID!',
        'price': int,
        'name': str,
    }
    result = g.NN(types.RatioTicketType)


@c.class_field
class updateRatioTicketType(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        ticket_type = models.TicketType.objects.get(uuid=input['id'])

        for field in ('price', 'name'):
            if input.get(field) is not None:
                setattr(ticket_type, field, input[field])

        ticket_type.full_clean()
        ticket_type.save()
        return ticket_type

    permissions = [user_perm('ratio.manage')]
    input = {
        'id': 'ID!',
        'price': Optional[int],
        'name': Optional[str],
    }
    result = g.NN(types.RatioTicketType)


@c.class_field
class deleteRatioTicketType(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        ticket_type = models.TicketType.objects.get(
            uuid=input['id'],
        )
        ticket_type.delete()
        return {'ok': True}

    permissions = [user_perm('ratio.manage')]
    input = {
        'id': 'ID!',
    }
    result = g.NN(basic_types.BasicResult)


mutations = c.as_dict()
