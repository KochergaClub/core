from django.db import models

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
