from typing import Optional

from django.contrib.auth import get_user_model

from kocherga.graphql import g, helpers
from kocherga.graphql.decorators import auth

from .. import models, kkm


c = helpers.Collection()


# cashierCreatePayment(params: CashierCreatePaymentInput!): Boolean @auth(permission: "cashier.create")
@c.class_field
class cashierCreatePayment(helpers.BaseFieldWithInput):
    @auth(permission="cashier.create")
    def resolve(self, _, info, params):
        user = get_user_model().objects.get(pk=params['whom'])
        models.Payment.objects.create(
            whom=user, amount=params['amount'], comment=params['comment'],
        )
        return True

    input = {'amount': int, 'whom': 'ID!', 'comment': str}
    input_argument_name = 'params'  # TODO

    result = g.Boolean


@c.class_field
class cashierRedeemPayment(helpers.BaseField):
    @auth(permission="cashier.redeem")
    def resolve(self, _, info, id):
        payment = models.Payment.objects.get(pk=id)
        payment.redeem()
        return True

    args = g.arguments({'id': 'ID!'})
    result = g.Boolean


# KKM-related methods; TODO - move to kocherga.kkm app


@c.class_field
class kkmRegisterCheck(helpers.BaseFieldWithInput):
    @auth(permission="cashier.kkm_user")
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
