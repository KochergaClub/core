import datetime

from ariadne import MutationType

from .. import models
from ..users import training2mailchimp
from .. import email

Mutation = MutationType()


@Mutation.field('ratioAddTraining')
def resolve_ratioAddTraining(_, info, params):
    date_str = params['date']
    date = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
    return models.Training.objects.create(
        name=params['name'],
        slug=params['slug'],
        date=date,
    )


@Mutation.field('ratioAddTicket')
def resolve_ratioAddTicket(_, info, input):
    training_id = input.pop('training')
    training = models.Training.objects.get(pk=training_id)
    ticket = models.Ticket.objects.create(
        **input,
        training=training,
    )
    return ticket


@Mutation.field('ratioTrainingCopyScheduleFrom')
def resolve_ratioTrainingCopyScheduleFrom(_, info, params):
    from_training = models.Training.objects.get(slug=params['from_training_slug'])
    to_training = models.Training.objects.get(slug=params['to_training_slug'])
    to_training.copy_schedule_from(from_training)
    return True


@Mutation.field('ratioTrainingAddDay')
def resolve_ratioTrainingAddDay(_, info, params):
    training = models.Training.objects.get(slug=params['training_slug'])
    date_str = params['date']
    date = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
    training.add_day(date)
    return True


@Mutation.field('ratioTicketFiscalize')
def resolve_ratioTicketFiscalize(_, info, ticket_id):
    ticket = models.Ticket.objects.get(pk=ticket_id)
    ticket.fiscalize()
    return True


@Mutation.field('ratioTrainingSyncParticipantsToMailchimp')
def resolve_ratioTrainingSyncParticipantsToMailchimp(_, info, training_id):
    training = models.Training.objects.get(pk=training_id)
    training2mailchimp(training)
    return True


@Mutation.field('ratioTrainingSendEmail')
def resolve_ratioTrainingSendEmail(_, info, input):
    training = models.Training.objects.get(pk=input['training_id'])
    title = input['title']
    content = input['content']
    result = email.create_any_draft(training, title, content)
    return {
        'draft_link': result['draft_link'],
    }
