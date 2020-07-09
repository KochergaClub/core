from kocherga.graphql.django_utils import DjangoObjectType
from kocherga.graphql import g

from ... import models


def extra_fields():
    from .training import RatioTraining

    return {'training': g.NN(RatioTraining)}


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
    extra_fields=extra_fields,  # delay import
)

