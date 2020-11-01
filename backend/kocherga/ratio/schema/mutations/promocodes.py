import logging

logger = logging.getLogger(__name__)

from typing import Optional

from kocherga.graphql import helpers, g
from kocherga.graphql.permissions import user_perm
import kocherga.django.schema.types
import django.db.utils
from django.db import transaction
from django.core.exceptions import ValidationError

from kocherga.django.errors import GenericError, BoxedError

from ... import models
from .. import types

c = helpers.Collection()


@c.class_field
class createRatioPromocode(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        ticket_type_id = input['ticket_type_id']
        try:
            ticket_type = models.TicketType.objects.get(uuid=ticket_type_id)
        except models.TicketType.DoesNotExist:
            return GenericError('Тип билета не найден')

        try:
            with transaction.atomic():
                promocode = models.Promocode.objects.create(
                    code=input['code'],
                    discount=input['discount'],
                    uses_max=input.get('uses_max'),
                )
                ticket_type.promocodes.add(promocode)
                ticket_type.save()
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
        'ticket_type_id': 'ID!',
        'code': str,
        'discount': int,
        'uses_max': Optional[int],
    }


@c.class_field
class checkRatioPromocode(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        try:
            ticket_type = models.TicketType.objects.get(uuid=input['ticket_type_id'])
            promocode = ticket_type.check_promocode(code=input['code'])
        except models.TicketType.DoesNotExist:
            return None
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


mutations = c.as_dict()
