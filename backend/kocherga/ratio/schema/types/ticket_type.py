from kocherga.graphql.django_utils import DjangoObjectType
from kocherga.graphql.permissions import user_perm
from kocherga.graphql import g, helpers

from ... import models
from .training import RatioTraining
from .promocode import RatioPromocodeConnection

fields = helpers.Collection()


@fields.class_field
class training(helpers.BaseField):
    def resolve(self, obj, info):
        return obj.training

    permissions = [user_perm('ratio.manage')]
    result = g.NN(RatioTraining)


@fields.class_field
class promocodes_count(helpers.BaseField):
    def resolve(self, obj, info, **pager):
        return obj.promocodes.count()

    permissions = [user_perm('ratio.manage')]

    result = int


@fields.class_field
class promocodes(helpers.BaseField):
    def resolve(self, obj, info, **pager):
        return models.Promocode.objects.filter(ticket_type=obj).relay_page(**pager)

    permissions = [user_perm('ratio.manage')]

    args = helpers.connection_args()
    result = g.NN(RatioPromocodeConnection)


RatioTicketType = DjangoObjectType(
    'RatioTicketType',
    model=models.TicketType,
    db_fields=[
        'price',
        'name',
    ],
    extra_fields={
        'id': g.Field(g.NN(g.ID), resolve=lambda obj, info: obj.uuid),
        **fields.as_dict(),
    },
)
