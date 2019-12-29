import datetime
from django import forms

import graphene
from graphene_django.forms.mutation import DjangoModelFormMutation

from kocherga.django.schema_utils import require_permission, Ok

from . import objects
from .. import models


class RatioAddTrainingInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    slug = graphene.String(required=True)
    date = graphene.String(required=True)


class RatioAddTraining(graphene.Mutation):
    class Arguments:
        params = RatioAddTrainingInput(required=True)

    Output = objects.RatioTraining

    @require_permission('ratio.manage')
    def mutate(self, info, params):
        return models.Training.objects.create(
            name=params.name,
            slug=params.slug,
            date=params.date,
        )


class RatioAddTicketForm(forms.ModelForm):
    class Meta:
        model = models.Ticket
        fields = (
            'training',
            'email', 'first_name', 'last_name', 'payment_amount',
            'status', 'fiscalization_status', 'ticket_type', 'payment_type',
            'comment',
        )


class RatioAddTicket(DjangoModelFormMutation):
    class Meta:
        form_class = RatioAddTicketForm
        input_field_name = 'params'
        exclude_fields = ('id')  # create only (for now)

    Output = objects.RatioTicket

    @classmethod
    def perform_mutate(cls, form, info):
        # FIXME - figure out how to do this properly with decorators
        if not info.context.user.has_perm('ratio.manage'):
            raise Exception("Forbidden")
        return super().perform_mutate(form, info)


class RatioTrainingCopyScheduleFromInput(graphene.InputObjectType):
    from_training_slug = graphene.String(required=True)
    to_training_slug = graphene.String(required=True)


class RatioTrainingCopyScheduleFrom(graphene.Mutation):
    class Arguments:
        params = RatioTrainingCopyScheduleFromInput(required=True)

    Output = Ok

    @require_permission('ratio.manage')
    def mutate(self, info, params):
        from_training = models.Training.objects.get(slug=params.from_training_slug)
        to_training = models.Training.objects.get(slug=params.to_training_slug)
        to_training.copy_schedule_from(from_training)
        return Ok(ok=True)


class RatioTrainingAddDayInput(graphene.InputObjectType):
    training_slug = graphene.String(required=True)
    date = graphene.String(required=True)


class RatioTrainingAddDay(graphene.Mutation):
    class Arguments:
        params = RatioTrainingAddDayInput(required=True)

    Output = Ok

    @require_permission('ratio.manage')
    def mutate(self, info, params):
        training = models.Training.objects.get(slug=params.training_slug)
        date_str = params.date
        date = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
        training.add_day(date)
        return Ok(ok=True)


class RatioTicketFiscalize(graphene.Mutation):
    class Arguments:
        ticket_id = graphene.ID(required=True)

    Output = Ok

    @require_permission('ratio.manage')
    @require_permission('cashier.kkm_user')
    def mutate(self, info, ticket_id):
        ticket = models.Ticket.objects.get(pk=ticket_id)
        ticket.fiscalize()
        return Ok(ok=True)
