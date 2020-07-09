from kocherga.graphql import g, helpers
from kocherga.graphql.decorators import staffonly

from .. import models

from . import types

c = helpers.Collection()


# emailMailchimpCategoriesAll: [EmailMailchimpCategory!]! @staffonly
@c.field
def emailMailchimpCategoriesAll(_):
    @staffonly
    def resolve(_, info):
        return models.MailchimpCategory.objects.all()

    return g.Field(g.NNList(types.EmailMailchimpCategory), resolve=resolve)


# emailSubscribeChannelsAll: [EmailSubscribeChannel!]! @staffonly
@c.field
def emailSubscribeChannelsAll(_):
    @staffonly
    def resolve(_, info):
        return models.SubscribeChannel.objects.all()

    return g.Field(g.NNList(types.EmailSubscribeChannel), resolve=resolve)


queries = c.as_dict()
