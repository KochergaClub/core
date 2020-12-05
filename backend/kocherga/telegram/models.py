import logging

logger = logging.getLogger(__name__)
from io import BytesIO

from django.db import models
from kocherga.django.models import Settings, SingletonModel
from kocherga.wagtail.utils import create_image_from_fh
from wagtail.admin import edit_handlers
from wagtailorderable.models import Orderable

from . import api


class Auth(SingletonModel):
    token = models.CharField(max_length=1024)


class Manage(models.Model):
    class Meta:
        managed = False
        default_permissions = ()

        permissions = [
            ('manage_chats', 'Can manage all telegram chats'),
        ]


class Chat(Orderable, models.Model):
    username = models.CharField(max_length=40, blank=True)

    # "xxxx" code in https://t.me/joinchat/xxxx URL
    invite_code = models.CharField(max_length=80, blank=True)

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
        edit_handlers.PageChooserPanel('project', 'projects.ProjectPage'),
    ]

    @property
    def link(self):
        if self.username:
            return f'https://t.me/{self.username}'
        if self.invite_code:
            return f'https://t.me/joinchat/{self.invite_code}'
        raise Exception("Neither username nor invite_code is set")

    def full_clean(self):
        if not self.username and not self.invite_code:
            raise Exception("One of `username` and `invite_code` must be set")
        if self.username and self.invite_code:
            raise Exception("Only one of `username` and `invite_code` must be set")

    def update_from_api(self):
        response = api.api_call('getChat', {'chat_id': '@' + self.username})
        self.title = response['result']['title']
        chat_photo = response['result'].get('photo', None)
        if chat_photo:
            photo = api.api_call('getFile', {'file_id': chat_photo['big_file_id']})

            photo_file_id = photo['result']['file_unique_id']
            if photo_file_id != self.photo_file_id:
                logger.info(repr(photo['result']))
                photo_bytes = api.get_file(photo['result']['file_path'])
                self.photo_file_id = photo_file_id
                self.photo = create_image_from_fh(
                    BytesIO(photo_bytes),
                    title=f'Telegram chat photo for {self.username}',
                    basename=f'telegram-chat-photo-{photo_file_id}',
                    user=None,
                    collection=Settings.load().telegram_images_collection,
                )
            else:
                logger.info(f"Photo for {obj.username} is already in local database")

        self.full_clean()
        self.save()
