from kocherga.graphql.django_utils import DjangoObjectType
from kocherga.graphql import g

from ... import models


def extra_fields():
    from .training import RatioTraining

    return {'training': g.NN(RatioTraining)}


def related_fields():
    from .payment import RatioPayment

    return {'payments': RatioPayment}


RatioTicket = DjangoObjectType(
    'RatioTicket',
    model=models.Ticket,
    db_fields=[
        'id',
        'email',
        'first_name',
        'last_name',
        'registration_date',
        'status',
        'ticket_type',
        'payment_type',
        'payment_amount',
        'fiscalization_status',
        'comment',
    ],
    related_fields=related_fields,
    extra_fields=extra_fields,  # delay import
)