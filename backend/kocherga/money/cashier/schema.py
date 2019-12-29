import graphene
from graphene_django.types import DjangoObjectType

from django.contrib.auth import get_user_model

from kocherga.django.schema_utils import require_staff, require_permission, Ok, NonNullConnection

from . import models


class CashierPayment(DjangoObjectType):
    class Meta:
        model = models.Payment
        fields = ('id', 'amount', 'whom', 'comment', 'created_dt', 'redeem_dt')
        interfaces = (graphene.relay.Node,)

    is_redeemed = graphene.Boolean(required=True)

    def resolve_is_redeemed(self, info):
        return self.is_redeemed()


class CashierPaymentConnection(NonNullConnection):
    class Meta:
        node = CashierPayment


class Query:
    cashierPayments = graphene.relay.ConnectionField(CashierPaymentConnection, required=True)

    @require_staff
    def resolve_cashierPayments(self, info):
        return models.Payment.objects.all()


class CashierCreatePaymentInput(graphene.InputObjectType):
    amount = graphene.Int(required=True)
    whom = graphene.ID(required=True)
    comment = graphene.String(required=True)


class CashierCreatePaymentMutation(graphene.Mutation):
    class Arguments:
        params = CashierCreatePaymentInput(required=True)

    Output = Ok

    @require_permission('cashier.create')
    def mutate(self, info, params):
        user = get_user_model().objects.get(pk=params.whom)
        models.Payment.objects.create(
            whom=user,
            amount=params.amount,
            comment=params.comment,
        )
        return Ok(ok=True)


class CashierRedeemPaymentMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    Output = Ok

    @require_permission('cashier.redeem')
    def mutate(self, info, id):
        payment = models.Payment.objects.get(pk=id)
        payment.redeem()
        return Ok(ok=True)


class Mutation:
    cashierCreatePayment = CashierCreatePaymentMutation.Field()
    cashierRedeemPayment = CashierRedeemPaymentMutation.Field()
