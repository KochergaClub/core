from kocherga.graphql import g, helpers, django_utils
from kocherga.graphql.permissions import user_perm

from .promocode import RatioPromocodeConnection
from ... import models


def related_fields():
    from .ticket import RatioTicket
    from .schedule import RatioTrainingDay
    from .ticket_type import RatioTicketType

    return {
        'tickets': RatioTicket,
        'schedule': ('days', RatioTrainingDay),
        'ticket_types': RatioTicketType,
    }


fields = helpers.Collection()


@fields.class_field
class promocodes_count(helpers.BaseField):
    def resolve(self, obj, info, **pager):
        return obj.promocodes.count()

    permissions = [user_perm('ratio.manage')]

    result = int


@fields.class_field
class promocodes(helpers.BaseField):
    def resolve(self, obj, info, **pager):
        return models.Promocode.objects.filter(trainings=obj.pk).relay_page(**pager)

    permissions = [user_perm('ratio.manage')]

    args = helpers.connection_args()
    result = g.NN(RatioPromocodeConnection)


RatioTraining = django_utils.DjangoObjectType(
    'RatioTraining',
    model=models.Training,
    db_fields=[
        'id',
        'name',
        'slug',
        'date',
        'telegram_link',
        'salaries_paid',
        'discount_by_email',
        'discount_percent_by_email',
    ],
    related_fields=related_fields,
    method_fields=['tickets_count', 'total_income'],
    extra_fields={
        **fields.as_dict(),
    },
)

RatioTrainingConnection = helpers.ConnectionType(RatioTraining)
