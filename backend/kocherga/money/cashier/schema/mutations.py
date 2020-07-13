from typing import Optional

from django.contrib.auth import get_user_model

from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import user_perm

from .. import models, kkm


c = helpers.Collection()


@c.class_field
class cashierCreatePayment(helpers.BaseFieldWithInput):
    def resolve(self, _, info, params):
        user = get_user_model().objects.get(pk=params['whom'])
        models.Payment.objects.create(
            whom=user, amount=params['amount'], comment=params['comment'],
        )
        return True

    permissions = [user_perm('cashier.create')]
    input = {'amount': int, 'whom': 'ID!', 'comment': str}
    input_argument_name = 'params'  # TODO

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


# KKM-related methods; TODO - move to kocherga.kkm app


@c.class_field
class kkmRegisterCheck(helpers.BaseFieldWithInput):
    def resolve(self, _, info, params):
        return kkm.execute(
            kkm.getCheckRequest(
                kkm.OnlineCheck(
                    email=params['email'],
                    title=params['title'],
                    sum=params['sum'],
                    signMethodCalculation=kkm.SignMethodCalculation(
                        params['sign_method_calculation']
                    ),
                )
            )
        )

    permissions = [user_perm('cashier.kkm_user')]
    input = {
        'email': str,
        'title': str,
        'sum': int,
        'sign_method_calculation': int,
    }
    input_argument_name = 'params'  # TODO

    result = {
        'status': int,
        'url': Optional[str],
        'error': Optional[str],
    }


mutations = c.as_dict()
