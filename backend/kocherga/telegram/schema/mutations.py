import logging

logger = logging.getLogger(__name__)

import re
from typing import Any, Dict

import kocherga.django.schema.types
from django.core.exceptions import ValidationError
from kocherga.django.errors import BoxedError, GenericError
from kocherga.graphql import django_utils, helpers

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
class createTelegramChatByInviteLink(
    helpers.UnionFieldMixin, helpers.BaseFieldWithInput
):
    def resolve(self, _, info, input):
        match = re.match(r'^https://t.me/joinchat/(\S+)$', input['invite_link'])
        if not match:
            return GenericError(
                "invite_link должен быть в форме https://t.me/joinchat/xxxxx"
            )
        invite_code = match.group(1)

        chat = models.Chat(invite_code=invite_code)
        try:
            chat.full_clean()
        except ValidationError as e:
            return BoxedError(e)
        chat.save()
        return chat

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


mutations = c.as_dict()
