from wagtail.core.fields import StreamField
from wagtail.admin.edit_handlers import StreamFieldPanel

from kocherga.wagtail.models import KochergaPage

from kocherga.wagtail.blocks import registry as blocks_registry
from . import blocks  # for side-effects - register in blocks registry


class FreeFormPage(KochergaPage):
    body = StreamField(
        sum(
            [blocks_registry.by_tag(tag) for tag in ('basic', 'columns', 'various')],
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
                for tag in ('basic', 'columns', 'various', 'front')
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
