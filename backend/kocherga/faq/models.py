from django.db import models
from rest_framework import fields

from wagtail.admin.edit_handlers import FieldPanel
from wagtail.core.fields import RichTextField
from wagtail.core.models import Orderable, Page
from wagtail.api import APIField
from wagtail.api.v2.serializers import PageSerializer, get_serializer_class
from modelcluster.fields import ParentalKey

from condensedinlinepanel.edit_handlers import CondensedInlinePanel

from kocherga.wagtail.mixins import HeadlessPreviewMixin


class NavPageField(fields.Field):
    def to_representation(self, value):
        # adapted from wagtail.api.v2.serializers.PageParentField
        serializer_class = get_serializer_class(
            value.__class__,
            ['id', 'type', 'detail_url', 'html_url', 'title'],
            meta_fields=['type', 'detail_url', 'html_url'],
            base=PageSerializer
        )
        serializer = serializer_class(context=self.context)
        return serializer.to_representation(value)


class FAQPage(HeadlessPreviewMixin, Page):
    summary = models.TextField('Короткое описание', blank=True)

    parent_page_types = ['pages.FrontPage', 'faq.FAQPage']
    subpage_types = ['faq.FAQPage']

    @property
    def prev_page(self):
        return self.get_prev_siblings().type(self.__class__).live().first()

    @property
    def next_page(self):
        return self.get_next_siblings().type(self.__class__).live().first()

    @property
    def subpages(self):
        return [
            page.specific
            for page in self.get_children().type(self.__class__).live()
        ]

    content_panels = Page.content_panels + [
        FieldPanel('summary'),
        CondensedInlinePanel('entries', label="Вопросы и ответы"),
    ]

    api_fields = [
        APIField('summary'),
        APIField('prev_page', serializer=NavPageField()),
        APIField('next_page', serializer=NavPageField()),
    ]
    # We could add `entries` to `api_fields` here, but the naive implementation causes circular import issues.
    # So we'll rely on /api/faq/entry REST call for now.

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
