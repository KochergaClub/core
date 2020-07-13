from kocherga.graphql import helpers, django_utils

from ... import models


def related_fields():
    from .ticket import RatioTicket
    from .schedule import RatioTrainingDay

    return {'tickets': RatioTicket, 'schedule': ('days', RatioTrainingDay)}


RatioTraining = django_utils.DjangoObjectType(
    'RatioTraining',
    model=models.Training,
    db_fields=['id', 'name', 'slug', 'date', 'telegram_link', 'salaries_paid'],
    related_fields=related_fields,
    extra_fields={'tickets_count': int, 'total_income': int, 'long_name': str},
)

RatioTrainingConnection = helpers.ConnectionType(RatioTraining)
