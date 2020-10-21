from kocherga.graphql import helpers, django_utils

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


RatioTraining = django_utils.DjangoObjectType(
    'RatioTraining',
    model=models.Training,
    db_fields=['id', 'name', 'slug', 'date', 'telegram_link', 'salaries_paid'],
    related_fields=related_fields,
    method_fields=['tickets_count', 'total_income'],
    extra_fields={'long_name': str},
)

RatioTrainingConnection = helpers.ConnectionType(RatioTraining)
