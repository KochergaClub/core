from kocherga.graphql import django_utils

from ... import models


RatioTrainer = django_utils.DjangoObjectType(
    'RatioTrainer', models.Trainer, db_fields=['id', 'short_name', 'long_name']
)

RatioActivity = django_utils.DjangoObjectType(
    'RatioActivity',
    model=models.Activity,
    db_fields=['id', 'time', 'activity_type', 'name', 'location'],
    extra_fields={'trainer': RatioTrainer},
)

RatioTrainingDay = django_utils.DjangoObjectType(
    'RatioTrainingDay',
    model=models.TrainingDay,
    db_fields=['id', 'date'],
    related_fields={'activities': ('schedule', RatioActivity)},
)
