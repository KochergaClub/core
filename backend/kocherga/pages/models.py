from wagtail.core.models import Page
from wagtail.core.fields import StreamField
from wagtail.admin.edit_handlers import StreamFieldPanel
from wagtail.api import APIField

from kocherga.wagtail.mixins import HeadlessPreviewMixin

from .blocks import all_blocks, hero_block


class FreeFormPage(HeadlessPreviewMixin, Page):
    body = StreamField(all_blocks)

    content_panels = Page.content_panels + [
        StreamFieldPanel('body'),
    ]

    api_fields = [
        APIField('body'),
    ]

    graphql_type = 'FreeFormPage'


class FrontPage(HeadlessPreviewMixin, Page):
    body = StreamField(all_blocks + [hero_block])

    content_panels = Page.content_panels + [
        StreamFieldPanel('body'),
    ]

    api_fields = [
        APIField('body'),
    ]

    graphql_type = 'FreeFormPage'


# fake model for wagtail folders
class FolderPage(Page):
    pass
