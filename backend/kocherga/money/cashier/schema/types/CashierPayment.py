from kocherga.graphql.types import DjangoObjectType

from ... import models

CashierPayment = DjangoObjectType('CashierPayment', models.Payment)

CashierPayment.simple_method_field('is_redeemed')
