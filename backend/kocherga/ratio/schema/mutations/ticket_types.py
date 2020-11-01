import logging

logger = logging.getLogger(__name__)

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
            discount_by_email=input.get('discount_by_email'),
        )
        ticket_type.full_clean()
        return ticket_type

    permissions = [user_perm('ratio.manage')]
    input = {
        'training_id': 'ID!',
        'price': int,
        'name': str,
        'discount_by_email': Optional[int],
    }
    result = g.NN(types.RatioTicketType)


@c.class_field
class updateRatioTicketType(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        ticket_type = models.TicketType.objects.get(uuid=input['id'])

        logger.info(repr(input))

        for field in ('price', 'name'):
            if input.get(field) is not None:
                setattr(ticket_type, field, input[field])

        # null value -> clean field
        if 'discount_by_email' in input:
            ticket_type.discount_by_email = input['discount_by_email']

        ticket_type.full_clean()
        ticket_type.save()
        return ticket_type

    permissions = [user_perm('ratio.manage')]
    input = {
        'id': 'ID!',
        'price': Optional[int],
        'name': Optional[str],
        'discount_by_email': Optional[int],
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


@c.class_field
class sendUniqueRatioPromocode(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        ticket_type = models.TicketType.objects.get(
            uuid=input['ticket_type_id'],
        )
        ticket_type.send_unique_promocode(input['email'])
        return {'ok': True}

    permissions = []
    input = {
        'ticket_type_id': 'ID!',
        'email': str,
    }

    # union with errors would be better, but this mutation is used in admin only anyway (for now)
    result = g.NN(basic_types.BasicResult)


mutations = c.as_dict()
