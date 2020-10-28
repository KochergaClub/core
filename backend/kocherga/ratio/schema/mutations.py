from typing import Optional
import datetime
import enum

from django.core.exceptions import ValidationError

import kocherga.django.schema.types
from kocherga.django.errors import GenericError, BoxedError

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


@c.class_field
class ratioCreateOrder(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        ticket_type_id = input['ticket_type_id']
        try:
            ticket_type = models.TicketType.objects.get(uuid=ticket_type_id)
        except models.TicketType.DoesNotExist:
            return GenericError('Тип билета не найден')

        try:
            order = models.Order.objects.create_order(
                ticket_type=ticket_type,
                email=input['email'],
                first_name=input['first_name'],
                last_name=input['last_name'],
                city=input['city'],
                payer_email=input.get('payer', {}).get('email', ''),
                payer_first_name=input.get('payer', {}).get('first_name', ''),
                payer_last_name=input.get('payer', {}).get('last_name', ''),
            )
            order.full_clean()  # extra precaution, make sure that order is ok
        except ValidationError as e:
            return BoxedError(e)

        return order

    result_types = {
        models.Order: types.RatioOrder,
        BoxedError: kocherga.django.schema.types.ValidationError,
        GenericError: kocherga.django.schema.types.GenericError,
    }

    permissions = []  # anyone can create an order

    PayerInput = g.InputObjectType(
        'RatioCreateOrderPayerInput',
        g.input_fields(
            {
                'email': str,
                'first_name': str,
                'last_name': str,
            }
        ),
    )
    input = {
        'ticket_type_id': 'ID!',  # this is uuid, TicketType's pk is hidden
        'email': str,
        'first_name': str,
        'last_name': str,
        'city': str,
        'payer': PayerInput,
    }


@c.class_field
class ratioConfirmOrder(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        order_id = input['order_id']
        try:
            order = models.Order.objects.get(uuid=order_id)
        except models.Order.DoesNotExist:
            return {'outcome': self.OutcomeEnum.NOT_FOUND.value}

        try:
            order.confirm()
        except models.Order.NotPaidError:
            return {'outcome': self.OutcomeEnum.NOT_PAID.value}
        except models.Order.AlreadyFulfilledError:
            return {'outcome': self.OutcomeEnum.ALREADY_FULFILLED.value}
        except models.Order.TicketAlreadyExistsError:
            return {'outcome': self.OutcomeEnum.TICKET_ALREADY_EXISTS.value}

        return {'outcome': self.OutcomeEnum.OK.value}

    permissions = []
    input = {
        'order_id': 'ID!',  # this is uuid, order's pk is hidden
    }

    class OutcomeEnum(enum.Enum):
        NOT_FOUND = 0
        NOT_PAID = 1
        OK = 2
        ALREADY_FULFILLED = 3
        TICKET_ALREADY_EXISTS = 4

    Outcome = g.EnumType('RatioConfirmOrderOutcome', OutcomeEnum)

    # Returning a ticket here is a bad idea: this mutation is public, so we shouldn' expose private objects.
    # Ratio ticket is currently a private type for usage by internal APIs only.
    result = g.NN(
        g.ObjectType(
            'RatioConfirmOrderResult',
            g.fields(
                {
                    'outcome': g.NN(Outcome),
                }
            ),
        )
    )


@c.class_field
class createRatioTicketType(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        training_id = input['training_id']

        training = models.Training.objects.get(pk=training_id)
        ticket_type = models.TicketType.objects.create(
            training=training,
            price=input['price'],
            name=input['name'],
        )
        ticket_type.full_clean()
        return ticket_type

    permissions = [user_perm('ratio.manage')]
    input = {
        'training_id': 'ID!',
        'price': int,
        'name': str,
    }
    result = g.NN(types.RatioTicketType)


@c.class_field
class updateRatioTicketType(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        ticket_type = models.TicketType.objects.get(uuid=input['id'])

        for field in ('price', 'name'):
            if input.get(field) is not None:
                setattr(ticket_type, field, input[field])

        ticket_type.full_clean()
        ticket_type.save()
        return ticket_type

    permissions = [user_perm('ratio.manage')]
    input = {
        'id': 'ID!',
        'price': Optional[int],
        'name': Optional[str],
    }
    result = g.NN(types.RatioTicketType)


@c.class_field
class deleteRatioTicketType(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        ticket_type = models.TicketType.objects.get(
            uuid=input['id'],
        )
        ticket_type.delete()
        return {'ok': True}

    permissions = [user_perm('ratio.manage')]
    input = {
        'id': 'ID!',
    }
    result = g.NN(basic_types.BasicResult)


mutations = c.as_dict()
