from kocherga.graphql import g, helpers, django_utils
from kocherga.auth.schema import types as auth_types

from ... import models

# type CashierPayment {
#   whom: AuthUser!
# }
CashierPayment = g.ObjectType(
    'CashierPayment',
    g.fields(
        {
            **django_utils.model_fields(
                models.Payment, ['id', 'amount', 'created_dt', 'redeem_dt', 'comment']
            ),
            'is_redeemed': bool,
            'whom': g.NN(auth_types.AuthUser),
        }
    ),
)

CashierPaymentConnection = helpers.ConnectionType(CashierPayment)
