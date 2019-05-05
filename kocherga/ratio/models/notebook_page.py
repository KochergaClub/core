from wagtail.core.models import Page
from wagtail.core.fields import StreamField
from wagtail.admin.edit_handlers import StreamFieldPanel
from wagtail.api import APIField

from ..blocks import notebook_blocks


class NotebookIndexPage(Page):
    parent_page_types = ['pages.FolderPage']
    subpage_types = ['ratio.NotebookPage']


class NotebookPage(Page):
    # training = ...
    sections = StreamField(notebook_blocks)

    content_panels = Page.content_panels + [
        StreamFieldPanel('sections'),
    ]

    api_fields = [
        APIField('sections'),
    ]

    parent_page_types = ['ratio.NotebookIndexPage']
    subpage_types = []
