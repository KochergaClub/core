import graphene
from graphene_django.types import DjangoObjectType

from kocherga.django.schema_utils import NNList

from .. import models


class RatioActivity(DjangoObjectType):
    class Meta:
        model = models.Activity
        fields = ('id', 'time', 'activity_type', 'name', 'trainer', 'location')


class RatioTrainingDay(DjangoObjectType):
    class Meta:
        model = models.TrainingDay
        fields = ('id', 'date')

    activities = NNList(RatioActivity)

    def resolve_activities(self, info):
        return self.schedule.all()


class RatioTraining(DjangoObjectType):
    class Meta:
        fields = ('id', 'name', 'slug', 'date', 'salaries_paid', 'tickets')
        model = models.Training

    total_income = graphene.Int(required=True)

    def resolve_total_income(self, info):
        return self.total_income()

    tickets_count = graphene.Int(required=True)

    def resolve_tickets_count(self, info):
        return self.tickets_count()

    long_name = graphene.String(required=True)

    def resolve_long_name(self, info):
        return self.long_name

    schedule = NNList(RatioTrainingDay)

    def resolve_schedule(self, info):
        return self.days.all()


class RatioTicket(DjangoObjectType):
    class Meta:
        model = models.Ticket
        fields = (
            'id',
            'training',
            'email', 'first_name', 'last_name', 'payment_amount',
            'status', 'fiscalization_status', 'ticket_type', 'payment_type',
            'registration_date', 'comment',
        )


class RatioTrainer(DjangoObjectType):
    class Meta:
        model = models.Trainer
        fields = (
            'id',
            'short_name',
            'long_name',
        )
