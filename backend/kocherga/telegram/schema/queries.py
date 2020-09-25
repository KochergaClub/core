from kocherga.graphql import g, helpers

from .. import models

from .types import TelegramChat

c = helpers.Collection()


@c.class_field
class telegramChats(helpers.BaseField):
    def resolve(self, _, info):
        return models.Chat.objects.all()

    permissions = []
    result = g.NNList(TelegramChat)


queries = c.as_dict()
