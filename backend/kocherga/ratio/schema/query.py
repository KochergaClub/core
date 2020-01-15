from ariadne import QueryType

from .. import models
from .. import email

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


@Query.field('ratioTrainingEmailPrototype')
def resolve_ratioTrainingEmailPrototype(self, info, training_id, type):
    training = models.Training.objects.get(pk=training_id)
    if type == 'pre':
        return email.get_pre_content(training)
    elif type == 'post':
        return email.get_post_content(training)
    else:
        raise Exception(f"Unknown email type `type`")
