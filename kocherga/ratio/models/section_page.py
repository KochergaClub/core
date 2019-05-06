from wagtail.core.models import Page
from wagtail.core.fields import StreamField
from django.db import models
from wagtail.admin.edit_handlers import StreamFieldPanel, FieldPanel
from wagtail.api import APIField

from ..blocks import section_blocks


class SectionIndexPage(Page):
    # parent_page_types = ['pages.FolderPage']
    subpage_types = ['ratio.SectionPage']


class SectionPage(Page):
    body = StreamField(section_blocks)
    status = models.CharField('Статус', max_length=40, default='placeholder', choices=(
        ('test', 'Тест'),
        ('placeholder', 'Заглушка'),
        ('in_progress', 'В разработке'),
        ('editing', 'Редактура'),
        ('ready', 'Готово'),
    ))

    content_panels = Page.content_panels + [
        FieldPanel('status'),
        StreamFieldPanel('body'),
    ]

    api_fields = [
        APIField('body'),
    ]

    parent_page_types = ['ratio.SectionIndexPage']
    subpage_types = []

    class Meta:
        verbose_name = 'Секция'
        verbose_name_plural = 'Секции'
