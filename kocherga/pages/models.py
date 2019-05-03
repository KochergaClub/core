from wagtail.core.models import Page
from wagtail.core.fields import StreamField
from wagtail.core import blocks
from wagtail.admin.edit_handlers import StreamFieldPanel
from wagtail.api import APIField


class HomePage(Page):
    body = StreamField([
        ('header', blocks.CharBlock(group='core')),
        ('paragraph', blocks.RichTextBlock(group='core')),
        ('grey', blocks.StructBlock([
            ('header', blocks.CharBlock()),
            ('text', blocks.RichTextBlock(required=False)),
        ])),
    ])

    content_panels = Page.content_panels + [
        StreamFieldPanel('body'),
    ]

    api_fields = [
        APIField('body'),
    ]


# fake model for wagtail folders
class FolderPage(Page):
    pass
