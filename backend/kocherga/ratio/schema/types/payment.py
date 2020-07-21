from kocherga.graphql.django_utils import DjangoObjectType
from kocherga.graphql import g

from ... import models


def extra_fields():
    from .ticket import RatioTicket

    return {'ticket': g.NN(RatioTicket)}


RatioPayment = DjangoObjectType(
    'RatioPayment',
    model=models.Payment,
    db_fields=[
        'id',
        'amount',
        'payment_type',
        'status',
        'fiscalization_status',
        'comment',
        'custom_kkm_title',
    ],
    extra_fields=extra_fields,  # delay import
)
