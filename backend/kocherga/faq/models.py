from django.db import models

from wagtail.admin.edit_handlers import FieldPanel
from wagtail.core.fields import RichTextField
from wagtail.core.models import Orderable, Page
from modelcluster.fields import ParentalKey

from condensedinlinepanel.edit_handlers import CondensedInlinePanel

from kocherga.wagtail.mixins import HeadlessPreviewMixin


class FAQPage(HeadlessPreviewMixin, Page):
    summary = models.TextField('Короткое описание', blank=True)

    parent_page_types = ['pages.FrontPage', 'faq.FAQPage']
    subpage_types = ['faq.FAQPage']

    @property
    def prev_page(self):
        result = self.get_prev_siblings().type(self.__class__).live().first()
        return result.specific if result else None

    @property
    def next_page(self):
        result = self.get_next_siblings().type(self.__class__).live().first()
        return result.specific if result else None

    @property
    def subpages(self):
        return [
            page.specific for page in self.get_children().type(self.__class__).live()
        ]

    content_panels = Page.content_panels + [
        FieldPanel('summary'),
        CondensedInlinePanel('entries', label="Вопросы и ответы"),
    ]

    graphql_type = 'FaqPage'


class Entry(Orderable, models.Model):
    page = ParentalKey('faq.FAQPage', on_delete=models.CASCADE, related_name='entries')

    created = models.DateTimeField(auto_now_add=True, null=True)
    updated = models.DateTimeField(auto_now=True, null=True)

    question = models.CharField('Вопрос', max_length=4096)
    answer = RichTextField('Ответ')

    panels = [
        FieldPanel('question'),
        FieldPanel('answer'),
    ]

    def __str__(self):
        return self.question
