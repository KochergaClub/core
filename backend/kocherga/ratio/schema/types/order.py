from kocherga.graphql.django_utils import DjangoObjectType
from kocherga.graphql import g, helpers
from kocherga.graphql.helpers import field_with_permissions
from kocherga.graphql.permissions import user_perm

from ... import models
from .ticket_type import RatioTicketType
from kocherga.yandex_kassa.schema.types import YandexKassaPayment


# most RatioOrder fields are hidden behind permissions, but `id` and `confirmation_token` are not, since RatioOrder is created as ratioCreateOrder mutation result
permissions = [user_perm('ratio.manage')]


RatioOrder = DjangoObjectType(
    'RatioOrder',
    model=models.Order,
    db_fields=[
        'fulfilled',
    ],
    extra_fields={
        'id': g.Field(g.NN(g.ID), resolve=lambda obj, info: obj.uuid),
        'confirmation_token': g.Field(
            g.NN(g.String),
            resolve=lambda obj, info: obj.payment.get_confirmation_token(),
        ),
        **{
            k: field_with_permissions(g.NN(g.String), permissions)
            for k in ('created', 'email', 'first_name', 'last_name', 'city')
        },
        'ticket_type': field_with_permissions(g.NN(RatioTicketType), permissions),
        'payment': field_with_permissions(g.NN(YandexKassaPayment), permissions),
    },
)

RatioOrderConnection = helpers.ConnectionType(RatioOrder)
