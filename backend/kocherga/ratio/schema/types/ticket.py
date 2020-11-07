from kocherga.graphql.django_utils import DjangoObjectType
from kocherga.graphql import g, helpers

from ... import models


def extra_fields():
    from .training import RatioTraining
    from .ticket_type import RatioTicketType

    return {
        'training': g.NN(RatioTraining),
        'ticket_type': RatioTicketType,
        'need_notion_link': g.Field(
            g.NN(g.Boolean),
            resolve=lambda obj, info: bool(obj.training.notion_created_email),
        ),
    }


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
        'created',
        'status',
        'ticket_class',
        'payment_amount',
        'comment',
        'notion_link',
    ],
    related_fields=related_fields,
    extra_fields=extra_fields,  # delay import
)

RatioTicketConnection = helpers.ConnectionType(RatioTicket)
