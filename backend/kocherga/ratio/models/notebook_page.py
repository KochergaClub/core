from wagtail.core.models import Page
from wagtail.core.fields import StreamField
from wagtail.admin.edit_handlers import StreamFieldPanel
from wagtail.api import APIField

from ..blocks import notebook_blocks

from kocherga.wagtail.mixins import HeadlessPreviewMixin


class NotebookIndexPage(HeadlessPreviewMixin, Page):
    parent_page_types = ['pages.FolderPage']
    subpage_types = ['ratio.NotebookPage']


class NotebookPage(HeadlessPreviewMixin, Page):
    # training = ...
    sections = StreamField(notebook_blocks)

    content_panels = Page.content_panels + [
        StreamFieldPanel('sections'),
    ]

    api_fields = [
        APIField('sections'),
    ]

    graphql_type = 'RatioNotebookPage'

    parent_page_types = ['ratio.NotebookIndexPage']
    subpage_types = []

    class Meta:
        verbose_name = 'Рабочая тетрадь'
        verbose_name_plural = 'Рабочие тетради'
