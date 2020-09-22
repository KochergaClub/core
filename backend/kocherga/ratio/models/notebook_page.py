from wagtail.core.fields import StreamField
from wagtail.admin.edit_handlers import StreamFieldPanel

from ..blocks import notebook_blocks

from kocherga.wagtail.models import KochergaPage


class NotebookIndexPage(KochergaPage):
    parent_page_types = ['pages.FolderPage']
    subpage_types = ['ratio.NotebookPage']
    max_count = 1

    graphql_type = 'RatioNotebookIndexPage'


class NotebookPage(KochergaPage):
    sections = StreamField(notebook_blocks)

    content_panels = KochergaPage.content_panels + [
        StreamFieldPanel('sections'),
    ]

    graphql_type = 'RatioNotebookPage'

    parent_page_types = ['ratio.NotebookIndexPage']
    subpage_types = []

    class Meta:
        verbose_name = 'Рабочая тетрадь'
        verbose_name_plural = 'Рабочие тетради'
