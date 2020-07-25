from django.db import models

from wagtail.admin.edit_handlers import FieldPanel

from kocherga.wagtail.models import KochergaPage


class PresentationIndexPage(KochergaPage):
    # parent_page_types = ['pages.FolderPage']
    subpage_types = ['ratio.PresentationPage']

    graphql_type = 'RatioPresentationIndexPage'

    class Meta:
        verbose_name = 'Список рацио-презентаций'
        verbose_name_plural = 'Списки рацио-презентаций'


class PresentationPage(KochergaPage):
    source = models.TextField()

    content_panels = KochergaPage.content_panels + [
        FieldPanel('source'),
    ]

    graphql_type = 'RatioPresentationPage'
    parent_page_types = ['ratio.PresentationIndexPage']
    subpage_types = []

    class Meta:
        verbose_name = 'Рацио-презентация'
        verbose_name_plural = 'Рацио-презентации'
