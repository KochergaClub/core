from kocherga.graphql.django_utils import DjangoObjectType

from ... import models


RatioPromocode = DjangoObjectType(
    'RatioPromocode',
    model=models.Promocode,
    db_fields=[
        'id',
        'code',
        'discount',
    ],
)
