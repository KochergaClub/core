from wagtail.admin.edit_handlers import StreamFieldPanel
from wagtail.core.fields import StreamField
from kocherga.wagtail.models import KochergaPage

from .blocks import slide_blocks


class PresentationPage(KochergaPage):
    slides = StreamField(slide_blocks, blank=True)

    content_panels = KochergaPage.content_panels + [
        StreamFieldPanel('slides'),
    ]

    graphql_type = 'PresentationPage'
    subpage_types = []

    @classmethod
    def can_create_at(cls, parent):
        if not super().can_create_at(parent):
            return False
        if parent.get_url() != '/team/ratio/slides':
            # Sorry, presentation pages can be under /team/ratio/slides only for security reasons
            return False

        return True

    class Meta:
        verbose_name = 'Презентация'
        verbose_name_plural = 'Презентации'
