from kocherga.graphql import g, helpers

from .. import models

fields = helpers.Collection()


@fields.class_field
class id(helpers.BaseField):
    def resolve(self, obj: models.Payment, info):
        return obj.pk

    permissions = []
    result = 'ID!'


@fields.class_field
class kassa_id(helpers.BaseField):
    def resolve(self, obj: models.Payment, info):
        return obj.get_kassa_id()

    permissions = []
    result = str


@fields.class_field
class is_paid(helpers.BaseField):
    def resolve(self, obj: models.Payment, info):
        return obj.is_paid

    permissions = []
    result = bool


@fields.class_field
class status(helpers.BaseField):
    def resolve(self, obj: models.Payment, info):
        return obj.status.value

    permissions = []
    result = g.NN(g.EnumType('YandexKassaPaymentStatus', models.PaymentStatus))


@fields.class_field
class waiting_for_capture(helpers.BaseField):
    def resolve(self, obj, info):
        return obj.waiting_for_capture

    permissions = []
    result = bool


YandexKassaPayment = g.ObjectType(
    'YandexKassaPayment',
    fields=fields.as_dict(),
)
