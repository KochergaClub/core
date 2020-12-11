import enum
from typing import Optional

import kocherga.django.schema.types
from django.core.exceptions import ValidationError
from kocherga.django.errors import BoxedError, GenericError
from kocherga.graphql import g, helpers

from ... import models
from .. import types

c = helpers.Collection()


@c.class_field
class ratioCreateOrder(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        ticket_type_id = input['ticket_type_id']
        try:
            ticket_type = models.TicketType.objects.get(uuid=ticket_type_id)
        except models.TicketType.DoesNotExist:
            return GenericError('Тип билета не найден')

        try:
            order = models.Order.objects.create_order(
                ticket_type=ticket_type,
                email=input['email'],
                first_name=input.get('first_name', ''),
                last_name=input.get('last_name', ''),
                city=input.get('city', ''),
                promocode=input.get('promocode', ''),
                payer_email=input.get('payer', {}).get('email', ''),
                payer_first_name=input.get('payer', {}).get('first_name', ''),
                payer_last_name=input.get('payer', {}).get('last_name', ''),
            )
            order.full_clean()  # extra precaution, make sure that order is ok
        except ValidationError as e:
            return BoxedError(e)

        return order

    result_types = {
        models.Order: types.RatioOrder,
        BoxedError: kocherga.django.schema.types.ValidationError,
        GenericError: kocherga.django.schema.types.GenericError,
    }

    permissions = []  # anyone can create an order

    PayerInput = g.InputObjectType(
        'RatioCreateOrderPayerInput',
        g.input_fields(
            {
                'email': str,
                'first_name': str,
                'last_name': str,
            }
        ),
    )
    input = {
        'ticket_type_id': 'ID!',  # this is uuid, TicketType's pk is hidden
        'email': str,
        'first_name': Optional[str],
        'last_name': Optional[str],
        'city': Optional[str],
        'promocode': Optional[str],
        'payer': PayerInput,
    }


@c.class_field
class ratioConfirmOrder(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        order_id = input['order_id']
        try:
            order = models.Order.objects.get(uuid=order_id)
        except models.Order.DoesNotExist:
            return {'outcome': self.OutcomeEnum.NOT_FOUND.value}

        try:
            order.confirm()
        except models.Order.NotPaidError:
            return {'outcome': self.OutcomeEnum.NOT_PAID.value}
        except models.Order.AlreadyFulfilledError:
            return {'outcome': self.OutcomeEnum.ALREADY_FULFILLED.value}
        except models.Order.TicketAlreadyExistsError:
            return {'outcome': self.OutcomeEnum.TICKET_ALREADY_EXISTS.value}

        return {'outcome': self.OutcomeEnum.OK.value}

    permissions = []
    input = {
        'order_id': 'ID!',  # this is uuid, order's pk is hidden
    }

    class OutcomeEnum(enum.Enum):
        NOT_FOUND = 0
        NOT_PAID = 1
        OK = 2
        ALREADY_FULFILLED = 3
        TICKET_ALREADY_EXISTS = 4

    Outcome = g.EnumType('RatioConfirmOrderOutcome', OutcomeEnum)

    # Returning a ticket here is a bad idea: this mutation is public, so we shouldn' expose private objects.
    # Ratio ticket is currently a private type for usage by internal APIs only.
    result = g.NN(
        g.ObjectType(
            'RatioConfirmOrderResult',
            g.fields(
                {
                    'outcome': g.NN(Outcome),
                }
            ),
        )
    )


mutations = c.as_dict()
