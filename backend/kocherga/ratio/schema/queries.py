from typing import Optional
from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import user_perm

from .. import models
from .. import email

from . import types

c = helpers.Collection()


@c.class_field
class ratioTrainings(helpers.BaseField):
    def resolve(self, _, info, filter=None, **pager):
        qs = models.Training.objects.all()
        if filter:
            if 'eternal' in filter:
                qs = qs.filter(date__isnull=filter['eternal'])
        return qs.relay_page(**pager)

    permissions = [user_perm('ratio.manage')]

    FilterInput = g.InputObjectType(
        'RatioTrainingsFilterInput', g.input_fields({'eternal': Optional[bool]})
    )
    args = {**helpers.connection_args(), 'filter': FilterInput}
    result = g.NN(types.RatioTrainingConnection)


@c.class_field
class ratioTrainingBySlug(helpers.BaseField):
    def resolve(self, _, info, slug):
        return models.Training.objects.get(slug=slug)

    permissions = [user_perm('ratio.manage')]
    args = {'slug': str}
    result = g.NN(types.RatioTraining)


@c.class_field
class ratioTrainersAll(helpers.BaseField):
    def resolve(self, _, info):
        return models.Trainer.objects.all()

    permissions = [user_perm('ratio.manage')]
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

    permissions = [user_perm('ratio.manage')]
    args = {'training_id': 'ID!', 'type': str}

    result = str


@c.class_field
class ratioTicketTypes(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        qs = models.TicketType.objects.for_active_trainings()
        if input.get('id'):
            qs = qs.filter(uuid=input['id'])
        return qs

    permissions = []
    input = {
        'id': 'ID',  # get one ticket type by id
    }
    result = g.NNList(types.RatioTicketType)


@c.class_field
class ratioOrders(helpers.BaseField):
    def resolve(self, _, info, **pager):
        return models.Order.objects.relay_page(order='-created', **pager)

    permissions = [user_perm('ratio.manage')]
    args = helpers.connection_args()
    result = g.NN(types.RatioOrderConnection)


queries = c.as_dict()
