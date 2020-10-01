from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import user_perm

from .. import models
from .. import email

from . import types

c = helpers.Collection()


@c.class_field
class ratioTrainings(helpers.BaseField):
    def resolve(self, _, info, **pager):
        return models.Training.objects.relay_page(**pager)

    permissions = [user_perm('ratio.manage')]
    args = helpers.connection_args()
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


queries = c.as_dict()
