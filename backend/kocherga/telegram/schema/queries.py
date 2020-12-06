from kocherga.graphql import g, helpers

from .. import models, permissions
from .types import TelegramChat

c = helpers.Collection()


@c.class_field
class publicTelegramChats(helpers.BaseField):
    def resolve(self, _, info):
        return models.Chat.objects.all().public_only()

    permissions = []
    result = g.NNList(TelegramChat)


# legacy name, TODO - remove
c.fields['telegramChats'] = c.fields['publicTelegramChats']


@c.class_field
class allTelegramChats(helpers.BaseField):
    def resolve(self, _, info):
        return models.Chat.objects.all()

    permissions = [permissions.view_all_telegram_chats]
    result = g.NNList(TelegramChat)


queries = c.as_dict()
