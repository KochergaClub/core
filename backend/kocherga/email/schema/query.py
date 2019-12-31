from ariadne import QueryType

from kocherga.django.schema_utils import require_staff

from .. import models

Query = QueryType()


@require_staff
@Query.field('emailMailchimpCategoriesAll')
def resolve_emailMailchimpCategoriesAll(_, info):
    return models.MailchimpCategory.objects.all()


@require_staff
@Query.field('emailSubscribeChannelsAll')
def resolve_emailSubscribeChannelsAll(_, info):
    return models.SubscribeChannel.objects.all()
