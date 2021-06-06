from datetime import timedelta

from django.db import models
from kocherga.django.models import SingletonModel
from kocherga.wagtail.blocks import registry as blocks_registry
from kocherga.wagtail.models import KochergaPage
from wagtail.admin.edit_handlers import StreamFieldPanel
from wagtail.core.fields import StreamField

# for side-effects - register in blocks registry
from . import blocks  # noqa: F401


class FreeFormPage(KochergaPage):
    body = StreamField(
        sum(
            [blocks_registry.by_tag(tag) for tag in ('basic', 'columns', 'various', 'landing')],
            start=[],
        )
    )

    content_panels = KochergaPage.content_panels + [
        StreamFieldPanel('body'),
    ]

    graphql_type = 'FreeFormPage'


class FrontPage(KochergaPage):
    body = StreamField(
        sum(
            [
                blocks_registry.by_tag(tag)
                for tag in ('basic', 'columns', 'various', 'landing')
            ],
            start=[],
        )
    )

    content_panels = KochergaPage.content_panels + [
        StreamFieldPanel('body'),
    ]

    graphql_type = 'FreeFormPage'


# fake model for wagtail folders
class FolderPage(KochergaPage):
    graphql_type = 'FolderPage'


class SpecialOffer(SingletonModel):
    text = models.CharField(max_length=255)
    link = models.CharField(max_length=255)
    button_text = models.CharField(max_length=40)
    until = models.DateTimeField()
    hide_duration = models.DurationField(default=timedelta(days=7))

    def __str__(self):
        return 'Особое предложение'
