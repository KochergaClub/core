from kocherga.graphql.django_utils import DjangoObjectType, related_field
from kocherga.graphql.permissions import user_perm
from kocherga.graphql import g, helpers

from ... import models
from .training import RatioTraining
from .promocode import RatioPromocode

fields = helpers.Collection()


@fields.class_field
class training(helpers.BaseField):
    def resolve(self, obj, info):
        return obj.training

    permissions = [user_perm('ratio.manage')]
    result = g.NN(RatioTraining)


RatioTicketType = DjangoObjectType(
    'RatioTicketType',
    model=models.TicketType,
    db_fields=[
        'price',
        'name',
    ],
    extra_fields={
        'id': g.Field(g.NN(g.ID), resolve=lambda obj, info: obj.uuid),
        'promocodes': related_field(
            models.TicketType,
            'promocodes',
            item_type=RatioPromocode,
            permissions=[user_perm('ratio.manage')],
        ),
        **fields.as_dict(),
    },
)
