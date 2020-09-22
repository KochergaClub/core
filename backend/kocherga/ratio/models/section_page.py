from wagtail.core.fields import StreamField
from django.db import models
from wagtail.admin.edit_handlers import StreamFieldPanel, FieldPanel

from ..blocks import section_blocks

from kocherga.wagtail.models import KochergaPage


class SectionIndexPage(KochergaPage):
    # parent_page_types = ['pages.FolderPage']
    subpage_types = ['ratio.SectionPage']
    max_count = 1

    graphql_type = 'RatioSectionIndexPage'

    class Meta:
        verbose_name = 'Список рацио-секций'
        verbose_name_plural = 'Списки рацио-секций'


class SectionPage(KochergaPage):
    body = StreamField(section_blocks)
    status = models.CharField(
        'Статус',
        max_length=40,
        default='placeholder',
        choices=(
            ('test', 'Тест'),
            ('placeholder', 'Заглушка'),
            ('in_progress', 'В разработке'),
            ('editing', 'Редактура'),
            ('ready', 'Готово'),
        ),
    )

    content_panels = KochergaPage.content_panels + [
        FieldPanel('status'),
        StreamFieldPanel('body'),
    ]

    graphql_type = 'RatioSectionPage'

    parent_page_types = ['ratio.SectionIndexPage']
    subpage_types = []

    class Meta:
        verbose_name = 'Рацио-секция'
        verbose_name_plural = 'Рацио-секции'
