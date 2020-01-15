from ariadne import QueryType

from .. import models

Query = QueryType()


@Query.field('emailMailchimpCategoriesAll')
def resolve_emailMailchimpCategoriesAll(_, info):
    return models.MailchimpCategory.objects.all()


@Query.field('emailSubscribeChannelsAll')
def resolve_emailSubscribeChannelsAll(_, info):
    return models.SubscribeChannel.objects.all()
