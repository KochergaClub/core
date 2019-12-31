from ariadne import MutationType
from django.contrib.auth import get_user_model

from kocherga.django.schema_utils import require_permission

from .. import models, kkm

Mutation = MutationType()


@require_permission('cashier.create')
@Mutation.field('cashierCreatePayment')
def cashierCreatePayment(_, info, params):
    user = get_user_model().objects.get(pk=params['whom'])
    models.Payment.objects.create(
        whom=user,
        amount=params['amount'],
        comment=params['comment'],
    )
    return True


@require_permission('cashier.redeem')
@Mutation.field('cashierRedeemPayment')
def cashierRedeemPayment(_, info, id):
    payment = models.Payment.objects.get(pk=id)
    payment.redeem()
    return True


@require_permission('cashier.kkm_user')
@Mutation.field('kkmRegisterCheck')
def kkmRegisterCheck(_, info, params):
    return kkm.execute(
        kkm.getCheckRequest(
            kkm.OnlineCheck(
                email=params['email'],
                title=input['title'],
                sum=params['sum'],
                signMethodCalculation=kkm.SignMethodCalculation(params['sign_method_calculation']),
            )
        )
    )
