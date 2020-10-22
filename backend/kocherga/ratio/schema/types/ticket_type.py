from kocherga.graphql.django_utils import DjangoObjectType
from kocherga.graphql.permissions import user_perm
from kocherga.graphql import g, helpers

from ... import models
from .training import RatioTraining


class training_field(helpers.BaseField):
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
        'training': training_field().as_field(),
    },
)
