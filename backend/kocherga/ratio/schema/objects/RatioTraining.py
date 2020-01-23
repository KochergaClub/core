from kocherga.graphql.types import DjangoObjectType

from ...import models

RatioTraining = DjangoObjectType('RatioTraining', models.Training)

RatioTraining.related_field('tickets')
RatioTraining.simple_method_field('tickets_count')
RatioTraining.simple_method_field('total_income')
RatioTraining.simple_method_field('long_name')


@RatioTraining.field('schedule')
def resolve_schedule(obj, info):
    return obj.days.all()
