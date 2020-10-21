from kocherga.graphql.django_utils import DjangoObjectType
from kocherga.graphql import g

from ... import models


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
    },
)
