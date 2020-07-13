from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import staffonly


from .. import models

from . import types

c = helpers.Collection()


@c.class_field
class emailMailchimpCategoriesAll(helpers.BaseField):
    permissions = [staffonly]
    result = g.NNList(types.EmailMailchimpCategory)

    def resolve(self, _, info):
        return models.MailchimpCategory.objects.all()


@c.class_field
class emailSubscribeChannelsAll(helpers.BaseField):
    permissions = [staffonly]
    result = g.NNList(types.EmailSubscribeChannel)

    def resolve(self, _, info):
        return models.SubscribeChannel.objects.all()


queries = c.as_dict()
