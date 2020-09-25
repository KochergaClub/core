from django.db import models

from wagtail.admin import edit_handlers
from wagtailorderable.models import Orderable

from kocherga.django.models import SingletonModel


class Auth(SingletonModel):
    token = models.CharField(max_length=1024)


class Chat(Orderable, models.Model):
    username = models.CharField(max_length=40)

    # will be populated by importer
    title = models.CharField(max_length=255, editable=False, blank=True)
    photo = models.ForeignKey(
        'kocherga_wagtail.CustomImage',
        on_delete=models.PROTECT,
        related_name='+',
        editable=False,
        null=True,
        blank=True,
    )

    # used to avoid image refetches from telegram
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
