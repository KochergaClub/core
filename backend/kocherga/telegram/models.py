import logging
import re

logger = logging.getLogger(__name__)
from io import BytesIO

import telethon.tl
from asgiref.sync import async_to_sync
from django.db import models
from kocherga.django.models import Settings, SingletonModel
from kocherga.wagtail.utils import create_image_from_fh
from wagtail.admin import edit_handlers
from wagtailorderable.models import Orderable

from . import api, core_api


class Auth(SingletonModel):
    token = models.CharField(max_length=1024)


class Permissions(models.Model):
    class Meta:
        managed = False
        default_permissions = ()

        permissions = [
            ('manage_chats', 'Can manage all telegram chats'),
            ('view_all_chats', 'Can list and access all telegram chats'),
            ('post_to_chats', 'Can post to any telegram chats via bot'),
        ]


class ChatQuerySet(models.QuerySet):
    def public_only(self):
        """Get public chats, e.g. for /community/chats page.

        This method should match Chat.is_public() condition."""
        return self.filter(
            ~models.Q(username='') | models.Q(force_public=True)
        ).exclude(delisted=True)


class ChatManager(models.Manager):
    class BadInviteLinkFormatError(Exception):
        pass

    def get_queryset(self):
        return ChatQuerySet(self.model, using=self._db)

    def create_by_invite_link(self, invite_link: str, force_public: bool = False):
        match = re.match(r'^https://t.me/joinchat/(\S+)$', invite_link)
        if not match:
            raise self.BadInviteLinkFormatError()
        invite_code = match.group(1)

        async def get_chat_id():
            client = await core_api.get_client()
            result = await client(
                telethon.tl.functions.messages.CheckChatInviteRequest(hash=invite_code)
            )
            if not isinstance(result, telethon.tl.types.ChatInviteAlready):
                raise Exception("Bot must be invited to chat first")
            # based on https://stackoverflow.com/a/39943226 and empirical observations
            return -int('100' + str(result.chat.id))

        chat_id = async_to_sync(get_chat_id)()

        chat = Chat(chat_id=chat_id, invite_link=invite_link, force_public=force_public)
        chat.full_clean()
        chat.update_from_api()
        chat.save()
        return chat


class Chat(Orderable, models.Model):
    # at least one of `username` and `chat_id` must be set
    # TODO - make `chat_id` non-null, set on creation (this'll guarantee that we'll never add non-existent chats)
    chat_id = models.BigIntegerField(blank=True, null=True, unique=True)
    username = models.CharField(max_length=40, blank=True)

    # URL in https://t.me/joinchat/xxxx form, if username is missing
    invite_link = models.URLField(max_length=200, blank=True)

    # if true then chat is public even if it doesn't have username
    force_public = models.BooleanField(default=False)

    # if true then chat will not be returned in publicTelegramChats list and /community/chats page
    # (but might still be displayed on other pages, e.g. inactive project's page)
    delisted = models.BooleanField(default=False)

    # will be populated by update_from_api()
    title = models.CharField(max_length=255, editable=False, blank=True)
    photo = models.ForeignKey(
        'kocherga_wagtail.CustomImage',
        on_delete=models.PROTECT,
        related_name='+',
        editable=False,
        null=True,
        blank=True,
    )

    # cache, used to avoid image refetches from telegram
    photo_file_id = models.CharField(max_length=255, editable=False, blank=True)

    project = models.ForeignKey(
        'projects.ProjectPage',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='telegram_chats',
    )

    panels = [
        edit_handlers.FieldPanel('username'),
        edit_handlers.FieldPanel('force_public'),
        edit_handlers.FieldPanel('delisted'),
        edit_handlers.PageChooserPanel('project', 'projects.ProjectPage'),
    ]

    objects = ChatManager()

    @property
    def link(self):
        if self.username:
            return f'https://t.me/{self.username}'
        if self.invite_link:
            return self.invite_link
        raise Exception("Neither username nor invite_link is set")

    @property
    def is_public(self):
        """Check whether chat should be listed publically, e.g. on /community/chats page.

        This method should match ChatQuerySet.public_only() query (except for `delisted` condition)."""
        return bool(self.username or self.force_public)

    def clean(self):
        if not self.username and not self.chat_id:
            raise Exception("One of `username` and `chat_id` must be set")
        if self.force_public and self.username:
            raise Exception(
                "`force_public` makes sense only for chats without `username`"
            )
        if not self.is_public and self.delisted:
            raise Exception("`delisted` doesn't make sense for non-public chats")
        if not self.is_public and self.project:
            # Because project.telegram_chats doesn't filter out non-public chats, at least for now.
            raise Exception("Non-public chats can't be linked with projects")

    def update_from_api(self):
        chat_id = self.chat_id if self.chat_id else '@' + self.username
        response = api.api_call('getChat', {'chat_id': chat_id})

        self.title = response['result']['title']
        chat_photo = response['result'].get('photo', None)

        # update always - chat usernames can be changed but we'll keep track of them by chat_id
        self.username = response['result'].get('username', '')

        # TODO - update invite_link if necessary

        if not self.chat_id:
            self.chat_id = response['result']['id']

        if chat_photo:
            photo = api.api_call('getFile', {'file_id': chat_photo['big_file_id']})

            photo_file_id = photo['result']['file_unique_id']
            if photo_file_id != self.photo_file_id:
                logger.info(repr(photo['result']))
                photo_bytes = api.get_file(photo['result']['file_path'])
                self.photo_file_id = photo_file_id
                self.photo = create_image_from_fh(
                    BytesIO(photo_bytes),
                    title=f'Telegram chat photo for {self}',
                    basename=f'telegram-chat-photo-{photo_file_id}',
                    user=None,
                    collection=Settings.load().telegram_images_collection,
                )
            else:
                logger.info(f"Photo for {self} is already in local database")

        self.full_clean()
        self.save()
