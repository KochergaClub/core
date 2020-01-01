from kocherga.graphql.types import DjangoObjectType

from ...import models

RatioTraining = DjangoObjectType('RatioTraining', models.Training)

RatioTraining.related_field('tickets')
RatioTraining.related_field('schedule')
RatioTraining.simple_method_field('tickets_count')
RatioTraining.simple_method_field('total_income')
RatioTraining.simple_method_field('long_name')
