import logging

logger = logging.getLogger(__name__)

import re
from typing import Any, Dict

import kocherga.django.schema.types
from django.core.exceptions import ValidationError
from kocherga.django.errors import BoxedError, GenericError
from kocherga.graphql import basic_types, django_utils, helpers

from .. import channels, models, permissions
from . import types

c = helpers.Collection()


@c.class_field
class addTelegramChat(django_utils.CreateMutation):
    model = models.Chat
    permissions = [permissions.manage_telegram_chats]
    fields = ['username']

    result_type = types.TelegramChat


@c.class_field
class addTelegramChatByInviteLink(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        try:
            return models.Chat.objects.create_by_invite_link(input['invite_link'])
        except models.Chat.objects.BadInviteLinkFormatError:
            return GenericError(
                "invite_link должен быть в форме https://t.me/joinchat/xxxxx"
            )
        except ValidationError as e:
            return BoxedError(e)

    permissions = [permissions.manage_telegram_chats]
    input = {
        'invite_link': str,
    }
    result_types = {
        models.Chat: types.TelegramChat,
        BoxedError: kocherga.django.schema.types.ValidationError,
        GenericError: kocherga.django.schema.types.GenericError,
    }


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


@c.class_field
class postToTelegramChat(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    class Ok:
        ok = True

    def resolve(self, _, info, input):
        channels.post_to_telegram_chat(input['id'], input['message'])
        return self.Ok()

    input = {
        'id': 'ID!',
        'message': str,
    }
    permissions = [permissions.post_to_telegram_chats]
    result_types = {Ok: basic_types.BasicResult}


mutations = c.as_dict()
