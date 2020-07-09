from typing import Optional
import datetime

from kocherga.graphql import g, helpers, decorators

from .. import models
from ..users import training2mailchimp
from .. import email

from . import types

c = helpers.Collection()


# ratioAddTraining(params: RatioAddTrainingInput!): RatioTraining! @auth(permission: "ratio.manage")
@c.class_field
class ratioAddTraining(helpers.BaseFieldWithInput):
    @decorators.auth(permission='ratio.manage')
    def resolve(self, _, info, params):
        date_str = params['date']
        date = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
        return models.Training.objects.create(
            name=params['name'],
            slug=params['slug'],
            date=date,
            telegram_link=params['telegram_link'],
        )

    input = {
        'name': str,
        'slug': str,
        'date': str,
        'telegram_link': str,
    }
    input_argument_name = 'params'  # TODO

    result = g.NN(types.RatioTraining)


# ratioAddTicket(input: RatioAddTicketInput!): RatioTicket! @auth(permission: "ratio.manage")
@c.class_field
class ratioAddTicket(helpers.BaseFieldWithInput):
    @decorators.auth(permission='ratio.manage')
    def resolve(self, _, info, input):
        training_id = input.pop('training')
        training = models.Training.objects.get(pk=training_id)
        ticket = models.Ticket.objects.create(**input, training=training,)
        return ticket

    input = {
        'training': 'ID!',
        'email': str,
        'first_name': str,
        'last_name': Optional[str],
        'payment_amount': int,
        'status': str,
        'fiscalization_status': str,
        'ticket_type': str,
        'payment_type': str,
        'comment': Optional[str],
    }

    result = g.NN(types.RatioTicket)


@c.class_field
class ratioTrainingCopyScheduleFrom(helpers.BaseFieldWithInput):
    @decorators.auth(permission='ratio.manage')
    def resolve(self, _, info, params):
        from_training = models.Training.objects.get(slug=params['from_training_slug'])
        to_training = models.Training.objects.get(slug=params['to_training_slug'])
        to_training.copy_schedule_from(from_training)
        return True

    input = {
        'from_training_slug': str,
        'to_training_slug': str,
    }
    input_argument_name = 'params'  # TODO

    result = bool


@c.class_field
class ratioTrainingAddDay(helpers.BaseFieldWithInput):
    @decorators.auth(permission='ratio.manage')
    def resolve(self, _, info, params):
        training = models.Training.objects.get(slug=params['training_slug'])
        date_str = params['date']
        date = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
        training.add_day(date)
        return True

    input = {
        'training_slug': str,
        'date': str,
    }
    input_argument_name = 'params'  # TODO

    result = bool


@c.class_field
class ratioTicketFiscalize(helpers.BaseField):
    @decorators.auth(permissions=["ratio.manage", "cashier.kkm_user"])
    def resolve(self, _, info, ticket_id):
        ticket = models.Ticket.objects.get(pk=ticket_id)
        ticket.fiscalize()
        return True

    args = {'ticket_id': 'ID!'}
    result = bool


@c.class_field
class ratioTrainingSyncParticipantsToMailchimp(helpers.BaseField):
    @decorators.auth(permission='ratio.manage')
    def resolve(self, _, info, training_id):
        training = models.Training.objects.get(pk=training_id)
        training2mailchimp(training)
        return True

    args = {'training_id': 'ID!'}
    result = bool


#   ratioTrainingSendEmail(
#     input: RatioTrainingSendEmailInput!
#   ): RatioTrainingSendEmailResult! @auth(permission: "ratio.manage")
@c.class_field
class ratioTrainingSendEmail(helpers.BaseFieldWithInput):
    @decorators.auth(permission='ratio.manage')
    def resolve(self, _, info, input):
        training = models.Training.objects.get(pk=input['training_id'])
        title = input['title']
        content = input['content']
        result = email.create_any_draft(training, title, content)
        return {
            'draft_link': result['draft_link'],
        }

    input = {
        'training_id': 'ID!',
        'title': str,
        'content': str,
    }

    result = {
        'draft_link': str,
    }


mutations = c.as_dict()
