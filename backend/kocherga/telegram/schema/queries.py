from kocherga.graphql import g, helpers, django_utils
from kocherga.wagtail import graphql_utils as wagtail_utils

from .. import models

c = helpers.Collection()

TelegramChat = django_utils.DjangoObjectType(
    'TelegramChat',
    model=models.Chat,
    db_fields=['id', 'username', 'title'],
    extra_fields={'photo': wagtail_utils.image_rendition_field(models.Chat, 'photo')},
)


@c.class_field
class telegramChats(helpers.BaseField):
    def resolve(self, _, info):
        return models.Chat.objects.all()

    permissions = []
    result = g.NNList(TelegramChat)


queries = c.as_dict()
