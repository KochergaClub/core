from kocherga.graphql import django_utils, g, helpers

from .. import models, permissions
from . import types

c = helpers.Collection()


@c.class_field
class createTelegramChat(django_utils.CreateMutation):
    model = models.Chat
    permissions = [permissions.manage_telegram_chats]
    fields = ['username']
    result_type = types.TelegramChat


@c.class_field
class deleteTelegramChat(django_utils.DeleteMutation):
    model = models.Chat
    permissions = [permissions.manage_telegram_chats]


@c.class_field
class refreshTelegramChatData(helpers.UnionFieldMixin, helpers.BaseField):
    def resolve(self, _, info, id):
        chat = models.Chat.objects.get(pk=id)
        chat.update_from_api()
        return chat

    args = {'id': 'ID!'}
    permissions = [permissions.manage_telegram_chats]
    result_types = {models.Chat: types.TelegramChat}


mutations = c.as_dict()
