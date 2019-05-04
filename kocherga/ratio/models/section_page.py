from wagtail.core.models import Page
from wagtail.core.fields import StreamField
from wagtail.admin.edit_handlers import StreamFieldPanel
from wagtail.api import APIField

from ..blocks import section_blocks


class SectionIndexPage(Page):
    # parent_page_types = ['pages.FolderPage']
    subpage_types = ['ratio.SectionPage']


class SectionPage(Page):
    body = StreamField(section_blocks)

    content_panels = Page.content_panels + [
        StreamFieldPanel('body'),
    ]

    api_fields = [
        APIField('body'),
    ]

    parent_page_types = ['ratio.SectionIndexPage']
    subpage_types = []
