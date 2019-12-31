from ariadne import QueryType

from kocherga.django.schema_utils import require_permission

from .. import models

Query = QueryType()


@require_permission('ratio.manage')
@Query.field('ratioTrainings')
def resolve_ratioTrainings(self, info, **pager):
    return models.Training.objects.relay_page(**pager)


@require_permission('ratio.manage')
@Query.field('ratioTrainingBySlug')
def resolve_ratioTrainingBySlug(self, info, slug):
    return models.Training.objects.get(slug=slug)


@require_permission('ratio.manage')
@Query.field('ratioTrainersAll')
def resolve_ratioTrainersAll(self, info):
    return models.Trainer.objects.all()
