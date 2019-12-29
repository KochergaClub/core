import graphene

from kocherga.django.schema_utils import NNList, NonNullConnection, require_permission

from . import objects, mutations
from .. import models


class RatioTrainingConnection(NonNullConnection):
    class Meta:
        node = objects.RatioTraining


class Query:
    ratioTrainings = graphene.relay.ConnectionField(RatioTrainingConnection, required=True)

    @require_permission('ratio.manage')
    def resolve_ratioTrainings(self, info, **kwargs):
        return models.Training.objects.all()

    ratioTrainingBySlug = graphene.Field(graphene.NonNull(objects.RatioTraining), slug=graphene.String(required=True))

    @require_permission('ratio.manage')
    def resolve_ratioTrainingBySlug(self, info, slug):
        return models.Training.objects.get(slug=slug)

    ratioTrainersAll = NNList(objects.RatioTrainer)

    @require_permission('ratio.manage')
    def resolve_ratioTrainersAll(self, info):
        return models.Trainer.objects.all()


class Mutation:
    ratioAddTraining = mutations.RatioAddTraining.Field(required=True)
    ratioAddTicket = mutations.RatioAddTicket.Field(required=True)
    ratioTrainingCopyScheduleFrom = mutations.RatioTrainingCopyScheduleFrom.Field(required=True)
    ratioTrainingAddDay = mutations.RatioTrainingAddDay.Field(required=True)
    ratioTicketFiscalize = mutations.RatioTicketFiscalize.Field(required=True)
