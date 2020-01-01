from ariadne import QueryType

from .. import models

Query = QueryType()


@Query.field('ratioTrainings')
def resolve_ratioTrainings(self, info, **pager):
    return models.Training.objects.relay_page(**pager)


@Query.field('ratioTrainingBySlug')
def resolve_ratioTrainingBySlug(self, info, slug):
    return models.Training.objects.get(slug=slug)


@Query.field('ratioTrainersAll')
def resolve_ratioTrainersAll(self, info):
    return models.Trainer.objects.all()
