from kocherga.graphql import g, helpers, django_utils
from kocherga.auth.schema.types import AuthUser

from ... import models

CashierPayment = django_utils.DjangoObjectType(
    'CashierPayment',
    model=models.Payment,
    db_fields=['id', 'amount', 'created_dt', 'redeem_dt', 'comment'],
    method_fields=['is_redeemed'],
    extra_fields={'whom': g.NN(AuthUser)},
)

CashierPaymentConnection = helpers.ConnectionType(CashierPayment)
