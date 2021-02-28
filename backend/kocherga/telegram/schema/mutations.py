import logging
from typing import Optional

logger = logging.getLogger(__name__)

import kocherga.django.schema.types
from django.core.exceptions import ValidationError
from kocherga.django.errors import BoxedError, GenericError
from kocherga.graphql import basic_types, django_utils, helpers
import kocherga.projects.models

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
class updateTelegramChat(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        obj = models.Chat.objects.get(pk=input['id'])

        if 'force_public' in input:
            obj.force_public = input['force_public']
        if 'project_slug' in input:
            if not input['project_slug']:
                obj.project = None
            else:
                obj.project = (
                    kocherga.projects.models.ProjectPage.objects.live()
                    .public()
                    .get(slug=input['project_slug'])
                )

        try:
            obj.full_clean()
        except ValidationError as e:
            return BoxedError(e)
        obj.save()
        return obj

    input = {
        'id': 'ID!',
        'force_public': Optional[bool],
        'project_slug': Optional[str],
    }
    permissions = [permissions.manage_telegram_chats]
    result_types = {
        models.Chat: types.TelegramChat,
        BoxedError: kocherga.django.schema.types.ValidationError,
    }


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
