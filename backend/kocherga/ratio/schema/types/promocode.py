from kocherga.graphql.django_utils import DjangoObjectType
from kocherga.graphql import helpers

from ... import models


RatioPromocode = DjangoObjectType(
    'RatioPromocode',
    model=models.Promocode,
    db_fields=[
        'id',
        'code',
        'discount',
        'discount_percent',
        'uses_max',
        'uses_count',
        'for_email',
    ],
)

RatioPromocodeConnection = helpers.ConnectionType(RatioPromocode)
