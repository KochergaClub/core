import logging

logger = logging.getLogger(__name__)

from typing import Optional, Union

from kocherga.graphql import helpers, g, basic_types
from kocherga.graphql.permissions import user_perm
import kocherga.django.schema.types
import django.db.utils
from django.db import transaction
from django.core.exceptions import ValidationError

from kocherga.django.errors import GenericError, BoxedError

from ... import models
from .. import types

c = helpers.Collection()


def find_discountable_entity(
    input,
) -> Union[models.Training, models.TicketType, GenericError]:
    if 'ticket_type_id' in input and 'training_id' in input:
        return GenericError(
            'Только один из параметров ticket_type_id и training_id должен быть выбран'
        )

    if input.get('ticket_type_id'):
        ticket_type_id = input['ticket_type_id']
        try:
            entity = models.TicketType.objects.get(uuid=ticket_type_id)
        except models.TicketType.DoesNotExist:
            return GenericError('Тип билета не найден')
    elif input.get('training_id'):
        training_id = input['training_id']
        try:
            entity = models.Training.objects.get(pk=training_id)
        except models.Training.DoesNotExist:
            return GenericError('Тренинг не найден')
    else:
        return GenericError(
            'Один из параметров ticket_type_id и training_id должен быть выбран'
        )

    return entity


@c.class_field
class createRatioPromocode(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        maybe_entity = find_discountable_entity(input)
        if isinstance(maybe_entity, GenericError):
            return maybe_entity
        entity = maybe_entity

        try:
            with transaction.atomic():
                promocode = models.Promocode.objects.create(
                    code=input['code'],
                    discount=input['discount'],
                    uses_max=input.get('uses_max'),
                )
                entity.promocodes.add(promocode)
                entity.save()
        except ValidationError as e:
            return BoxedError(e)
        except django.db.utils.IntegrityError as e:
            if e.args[0] == 1062:
                return GenericError("Промокод уже существует")
            raise e

        return promocode

    result_types = {
        models.Promocode: types.RatioPromocode,
        BoxedError: kocherga.django.schema.types.ValidationError,
        GenericError: kocherga.django.schema.types.GenericError,
    }

    permissions = [user_perm('ratio.manage')]
    input = {
        'ticket_type_id': 'ID',
        'training_id': 'ID',
        'code': str,
        'discount': int,
        'uses_max': Optional[int],
    }


@c.class_field
class checkRatioPromocode(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        try:
            ticket_type = models.TicketType.objects.get(uuid=input['ticket_type_id'])
        except models.TicketType.DoesNotExist:
            return None

        try:
            promocode = ticket_type.check_promocode(code=input['code'])
        except models.Promocode.DoesNotExist:
            return None

        if not promocode.is_valid():
            return None

        return {
            'discounted_price': promocode.check_apply(ticket_type.price),
        }

    permissions = []
    input = {
        'ticket_type_id': 'ID!',
        'code': str,
    }
    result = g.ObjectType(
        'CheckRatioPromocodeResult',
        g.fields(
            {
                'discounted_price': int,
            }
        ),
    )


@c.class_field
class sendUniqueRatioPromocode(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    class Ok:
        ok = True

    def resolve(self, _, info, input):
        maybe_entity = find_discountable_entity(input)
        if isinstance(maybe_entity, GenericError):
            return maybe_entity
        entity = maybe_entity

        entity.send_unique_promocode(input['email'])
        return self.Ok()

    permissions = []
    input = {
        'ticket_type_id': 'ID',
        'training_id': 'ID',
        'email': str,
    }

    result_types = {
        Ok: basic_types.BasicResult,
        GenericError: kocherga.django.schema.types.GenericError,
    }


mutations = c.as_dict()
