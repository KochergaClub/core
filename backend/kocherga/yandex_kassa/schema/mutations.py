from kocherga.graphql import helpers
import kocherga.django.schema.types
from kocherga.django.errors import GenericError
from kocherga.graphql.permissions import staffonly

from .. import models
from . import types

c = helpers.Collection()


@c.class_field
class updateYandexKassaPayment(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    """This is a reasonably safe operation, mostly used on admin pages to check what's going on with an unconfirmed
    order."""

    def resolve(self, _, info, input):
        id = input['id']
        try:
            payment = models.Payment.objects.get(pk=id)
        except models.Payment.DoesNotExist:
            return GenericError("Платёж не найден")

        payment.update()
        return payment

    permissions = [staffonly]
    input = {
        'id': 'ID!',
    }

    result_types = {
        models.Payment: types.YandexKassaPayment,
        GenericError: kocherga.django.schema.types.GenericError,
    }


@c.class_field
class cancelYandexKassaPayment(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        id = input['id']
        try:
            payment = models.Payment.objects.get(pk=id)
        except models.Payment.DoesNotExist:
            return GenericError("Платёж не найден")

        payment.cancel()
        return payment

    permissions = [staffonly]
    input = {
        'id': 'ID!',
    }

    result_types = {
        models.Payment: types.YandexKassaPayment,
        GenericError: kocherga.django.schema.types.GenericError,
    }


mutations = c.as_dict()
