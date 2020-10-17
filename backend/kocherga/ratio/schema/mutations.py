from typing import Optional
import datetime

from kocherga.graphql import g, helpers, basic_types
from kocherga.graphql.permissions import user_perm

from .. import models
from ..users import training2mailchimp
from .. import email

from . import types

c = helpers.Collection()


@c.class_field
class ratioAddTraining(helpers.BaseFieldWithInput):
    def resolve(self, _, info, params):
        date_str = params['date']
        date = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
        return models.Training.objects.create(
            name=params['name'],
            slug=params['slug'],
            date=date,
            telegram_link=params['telegram_link'],
        )

    permissions = [user_perm('ratio.manage')]
    input = {
        'name': str,
        'slug': str,
        'date': str,
        'telegram_link': str,
    }
    input_argument_name = 'params'  # TODO

    result = g.NN(types.RatioTraining)


@c.class_field
class ratioAddTicket(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        training_id = input.pop('training')

        training = models.Training.objects.get(pk=training_id)
        ticket = models.Ticket.objects.create(
            **input,
            training=training,
        )
        return ticket

    permissions = [user_perm('ratio.manage')]
    input = {
        'training': 'ID!',
        'email': str,
        'first_name': str,
        'last_name': Optional[str],
        'payment_amount': int,
        'ticket_type': Optional[str],
        'comment': Optional[str],
    }

    result = g.NN(types.RatioTicket)


@c.class_field
class ratioPaymentAdd(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        ticket_id = input.pop('ticket_id')
        ticket = models.Ticket.objects.get(pk=ticket_id)
        payment = models.Payment(**input, ticket=ticket)
        payment.full_clean()
        payment.save()
        return {
            'payment': payment,
        }

    permissions = [user_perm('ratio.manage')]
    input = {
        'ticket_id': 'ID!',
        'amount': int,
        'status': Optional[str],
        'fiscalization_status': str,
        'payment_type': str,
        'comment': Optional[str],
    }

    result = {
        'payment': g.NN(types.RatioPayment),
    }


@c.class_field
class ratioPaymentDelete(helpers.BaseField):
    def resolve(self, _, info, payment_id):
        payment = models.Payment.objects.get(pk=payment_id)
        payment.delete()
        return {'ok': True}

    permissions = [user_perm('ratio.manage')]
    args = {'payment_id': 'ID!'}
    result = g.NN(basic_types.BasicResult)


@c.class_field
class ratioPaymentFiscalize(helpers.BaseField):
    def resolve(self, _, info, payment_id):
        payment = models.Payment.objects.get(pk=payment_id)
        payment.fiscalize()
        return True

    permissions = [user_perm('ratio.manage'), user_perm('cashier.kkm_user')]
    args = {'payment_id': 'ID!'}
    result = bool


@c.class_field
class ratioPaymentFiscalizedManually(helpers.BaseField):
    def resolve(self, _, info, payment_id):
        payment = models.Payment.objects.get(pk=payment_id)
        assert payment.fiscalization_status in ('todo', 'in_progress')
        payment.fiscalization_status = 'fiscalized'
        payment.full_clean()
        payment.save()
        return {'payment': payment}

    permissions = [user_perm('ratio.manage')]
    args = {'payment_id': 'ID!'}
    result = {
        'payment': g.NN(types.RatioPayment),
    }


@c.class_field
class ratioPaymentSetStatus(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        payment = models.Payment.objects.get(pk=input['payment_id'])
        payment.status = input['status']
        payment.full_clean()
        payment.save()
        return {
            'payment': payment,
        }

    permissions = [user_perm('ratio.manage')]
    input = {
        'payment_id': 'ID!',
        'status': str,
    }
    result = {
        'payment': g.NN(types.RatioPayment),
    }


@c.class_field
class ratioTrainingCopyScheduleFrom(helpers.BaseFieldWithInput):
    def resolve(self, _, info, params):
        from_training = models.Training.objects.get(slug=params['from_training_slug'])
        to_training = models.Training.objects.get(slug=params['to_training_slug'])
        to_training.copy_schedule_from(from_training)
        return True

    permissions = [user_perm('ratio.manage')]
    input = {
        'from_training_slug': str,
        'to_training_slug': str,
    }
    input_argument_name = 'params'  # TODO

    result = bool


@c.class_field
class ratioTrainingAddDay(helpers.BaseFieldWithInput):
    def resolve(self, _, info, params):
        training = models.Training.objects.get(slug=params['training_slug'])
        date_str = params['date']
        date = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
        training.add_day(date)
        return True

    permissions = [user_perm('ratio.manage')]
    input = {
        'training_slug': str,
        'date': str,
    }
    input_argument_name = 'params'  # TODO

    result = bool


@c.class_field
class ratioTrainingSyncParticipantsToMailchimp(helpers.BaseField):
    def resolve(self, _, info, training_id):
        training = models.Training.objects.get(pk=training_id)
        training2mailchimp(training)
        return True

    permissions = [user_perm('ratio.manage')]
    args = {'training_id': 'ID!'}
    result = bool


#   ratioTrainingSendEmail(
#     input: RatioTrainingSendEmailInput!
#   ): RatioTrainingSendEmailResult! @auth(permission: "ratio.manage")
@c.class_field
class ratioTrainingSendEmail(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        training = models.Training.objects.get(pk=input['training_id'])
        title = input['title']
        content = input['content']
        result = email.create_any_draft(training, title, content)
        return {
            'draft_link': result['draft_link'],
        }

    permissions = [user_perm('ratio.manage')]
    input = {
        'training_id': 'ID!',
        'title': str,
        'content': str,
    }

    result = {
        'draft_link': str,
    }


mutations = c.as_dict()
