from wagtail.core.fields import StreamField
from wagtail.admin.edit_handlers import StreamFieldPanel

from kocherga.wagtail.models import KochergaPage

from .blocks import all_blocks, hero_blocks


class FreeFormPage(KochergaPage):
    body = StreamField(all_blocks)

    content_panels = KochergaPage.content_panels + [
        StreamFieldPanel('body'),
    ]

    graphql_type = 'FreeFormPage'


class FrontPage(KochergaPage):
    body = StreamField(all_blocks + hero_blocks)

    content_panels = KochergaPage.content_panels + [
        StreamFieldPanel('body'),
    ]

    graphql_type = 'FreeFormPage'


# fake model for wagtail folders
class FolderPage(KochergaPage):
    graphql_type = 'FolderPage'
