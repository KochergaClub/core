from typing import Optional

from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import user_perm

from .. import email, models
from . import types

c = helpers.Collection()


PERMISSIONS = [user_perm('ratio.manage')]


@c.class_field
class ratioTrainings(helpers.BaseField):
    def resolve(self, _, info, filter=None, **pager):
        qs = models.Training.objects.all()
        if filter:
            if 'eternal' in filter:
                qs = qs.filter(date__isnull=filter['eternal'])
        return qs.relay_page(**pager)

    permissions = PERMISSIONS

    FilterInput = g.InputObjectType(
        'RatioTrainingsFilterInput', g.input_fields({'eternal': Optional[bool]})
    )
    args = {**helpers.connection_args(), 'filter': FilterInput}

    result = g.NN(types.RatioTrainingConnection)


@c.class_field
class ratioTrainingBySlug(helpers.BaseField):
    def resolve(self, _, info, slug):
        return models.Training.objects.get(slug=slug)

    permissions = PERMISSIONS
    args = {'slug': str}
    result = g.NN(types.RatioTraining)


@c.class_field
class ratioTrainersAll(helpers.BaseField):
    def resolve(self, _, info):
        return models.Trainer.objects.all()

    permissions = PERMISSIONS
    result = g.NNList(types.RatioTrainer)


@c.class_field
class ratioTrainingEmailPrototype(helpers.BaseField):
    def resolve(self, _, info, training_id, type):
        training = models.Training.objects.get(pk=training_id)
        if type == 'pre':
            return email.get_pre_content(training)
        elif type == 'post':
            return email.get_post_content(training)
        else:
            raise Exception(f"Unknown email type {type}")

    permissions = PERMISSIONS
    args = {'training_id': 'ID!', 'type': str}

    result = str


@c.class_field
class ratioTicketTypes(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        qs = models.TicketType.objects.for_active_trainings()
        if input.get('id'):
            qs = qs.filter(uuid=input['id'])
        if input.get('training_type'):
            qs = qs.filter(training__training_type=input['training_type'])
        return qs

    # this query is public, it's used in order form
    permissions = []
    input = {
        'id': 'ID',  # get one ticket type by id
        'training_type': Optional[str],  # filter by training.training_type
    }
    result = g.NNList(types.RatioTicketType)


@c.class_field
class ratioTicketType(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        return models.TicketType.objects.get(uuid=input['id'])

    permissions = PERMISSIONS
    input = {
        'id': 'ID!',
    }
    result = g.NN(types.RatioTicketType)


@c.class_field
class ratioOrders(helpers.BaseField):
    def resolve(self, _, info, **pager):
        return models.Order.objects.relay_page(order='-created', **pager)

    permissions = PERMISSIONS
    args = helpers.connection_args()
    result = g.NN(types.RatioOrderConnection)


@c.class_field
class ratioTickets(helpers.BaseField):
    def resolve(self, _, info, filter=None, **pager):
        qs = models.Ticket.objects.all()
        if filter:
            if filter.get('with_missing_payments', False):
                qs = qs.with_missing_payments()
            if filter.get('with_unfiscalized_checks', False):
                qs = qs.with_unfiscalized_checks()
            if filter.get('without_notion_link', False):
                qs = qs.without_notion_link()
        return qs.relay_page(**pager)

    permissions = PERMISSIONS
    FilterInput = g.InputObjectType(
        'RatioTicketsFilterInput',
        g.input_fields(
            {
                'with_missing_payments': Optional[bool],
                'with_unfiscalized_checks': Optional[bool],
                'without_notion_link': Optional[bool],
            }
        ),
    )
    args = {**helpers.connection_args(), 'filter': FilterInput}
    result = g.NN(types.RatioTicketConnection)


@c.class_field
class ratioTicket(helpers.BaseField):
    def resolve(self, _, info, id):
        return models.Ticket.objects.get(pk=id)

    permissions = PERMISSIONS
    args = {'id': 'ID!'}
    result = g.NN(types.RatioTicket)


queries = c.as_dict()
