from wagtail.core.models import Page
from wagtail.core.fields import StreamField
from wagtail.admin.edit_handlers import StreamFieldPanel
from wagtail.api import APIField

from .blocks import all_blocks


class FreeFormPage(Page):
    body = StreamField(all_blocks)

    content_panels = Page.content_panels + [
        StreamFieldPanel('body'),
    ]

    api_fields = [
        APIField('body'),
    ]


# fake model for wagtail folders
class FolderPage(Page):
    pass
