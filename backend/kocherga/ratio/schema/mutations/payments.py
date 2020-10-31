from typing import Optional

from kocherga.graphql import g, helpers, basic_types
from kocherga.graphql.permissions import user_perm

from .. import types
from ... import models


c = helpers.Collection()


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


mutations = c.as_dict()
