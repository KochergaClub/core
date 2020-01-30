from ariadne import MutationType
from django.contrib.auth import get_user_model

from .. import models, kkm

Mutation = MutationType()


@Mutation.field('cashierCreatePayment')
def cashierCreatePayment(_, info, params):
    user = get_user_model().objects.get(pk=params['whom'])
    models.Payment.objects.create(
        whom=user,
        amount=params['amount'],
        comment=params['comment'],
    )
    return True


@Mutation.field('cashierRedeemPayment')
def cashierRedeemPayment(_, info, id):
    payment = models.Payment.objects.get(pk=id)
    payment.redeem()
    return True


@Mutation.field('kkmRegisterCheck')
def kkmRegisterCheck(_, info, params):
    return kkm.execute(
        kkm.getCheckRequest(
            kkm.OnlineCheck(
                email=params['email'],
                title=params['title'],
                sum=params['sum'],
                signMethodCalculation=kkm.SignMethodCalculation(params['sign_method_calculation']),
            )
        )
    )
