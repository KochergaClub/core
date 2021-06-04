from django.contrib.auth import get_user_model

from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import user_perm

from .. import models


c = helpers.Collection()


@c.class_field
class cashierCreatePayment(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        user = get_user_model().objects.get(pk=input['whom'])
        models.Payment.objects.create(
            whom=user,
            amount=input['amount'],
            comment=input['comment'],
        )
        return True

    permissions = [user_perm('cashier.create')]
    input = {'amount': int, 'whom': 'ID!', 'comment': str}

    result = g.Boolean


@c.class_field
class cashierRedeemPayment(helpers.BaseField):
    def resolve(self, _, info, id):
        payment = models.Payment.objects.get(pk=id)
        payment.redeem()
        return True

    permissions = [user_perm('cashier.redeem')]
    args = g.arguments({'id': 'ID!'})
    result = g.Boolean


mutations = c.as_dict()
