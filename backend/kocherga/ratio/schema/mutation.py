import datetime

from ariadne import MutationType

from kocherga.django.schema_utils import require_permission

from .. import models

Mutation = MutationType()


@require_permission('ratio.manage')
@Mutation.field('ratioAddTraining')
def resolve_ratioAddTraining(_, info, params):
    date_str = params['date']
    date = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
    return models.Training.objects.create(
        name=params['name'],
        slug=params['slug'],
        date=date,
    )


@require_permission('ratio.manage')
@Mutation.field('ratioAddTicket')
def resolve_ratioAddTicket(_, info, input):
    training_id = input.pop('training')
    training = models.Training.objects.get(pk=training_id)
    ticket = models.Ticket.objects.create(
        **input,
        training=training,
    )
    return ticket


@require_permission('ratio.manage')
@Mutation.field('ratioTrainingCopyScheduleFrom')
def resolve_ratioTrainingCopyScheduleFrom(_, info, params):
    from_training = models.Training.objects.get(slug=params['from_training_slug'])
    to_training = models.Training.objects.get(slug=params['to_training_slug'])
    to_training.copy_schedule_from(from_training)
    return True


@require_permission('ratio.manage')
@Mutation.field('ratioTrainingAddDay')
def resolve_ratioTrainingAddDay(_, info, params):
    training = models.Training.objects.get(slug=params['training_slug'])
    date_str = params['date']
    date = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
    training.add_day(date)
    return True


@require_permission('ratio.manage')
@require_permission('cashier.kkm_user')
@Mutation.field('ratioTicketFiscalize')
def resolve_ratioTicketFiscalize(_, info, ticket_id):
    ticket = models.Ticket.objects.get(pk=ticket_id)
    ticket.fiscalize()
    return True
