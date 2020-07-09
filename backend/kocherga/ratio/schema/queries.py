from kocherga.graphql import g, helpers
from kocherga.graphql.decorators import auth

from .. import models
from .. import email

from . import types

c = helpers.Collection()


@c.class_field
class ratioTrainings(helpers.BaseField):
    @auth(permission='ratio.manage')
    def resolve(self, _, info, **pager):
        return models.Training.objects.relay_page(**pager)

    args = helpers.connection_args()
    result = g.NN(types.RatioTrainingConnection)


@c.class_field
class ratioTrainingBySlug(helpers.BaseField):
    @auth(permission='ratio.manage')
    def resolve(self, _, info, slug):
        return models.Training.objects.get(slug=slug)

    args = {'slug': str}
    result = g.NN(types.RatioTraining)


@c.class_field
class ratioTrainersAll(helpers.BaseField):
    @auth(permission='ratio.manage')
    def resolve(self, _, info):
        return models.Trainer.objects.all()

    result = g.NNList(types.RatioTrainer)


#   ratioTrainingEmailPrototype(training_id: ID!, type: String!): String!
#     @auth(permission: "ratio.manage")
@c.class_field
class ratioTrainingEmailPrototype(helpers.BaseField):
    @auth(permission='ratio.manage')
    def resolve(self, _, info, training_id, type):
        training = models.Training.objects.get(pk=training_id)
        if type == 'pre':
            return email.get_pre_content(training)
        elif type == 'post':
            return email.get_post_content(training)
        else:
            raise Exception(f"Unknown email type `type`")

    args = {'training_id': 'ID!', 'type': str}

    result = str


queries = c.as_dict()
