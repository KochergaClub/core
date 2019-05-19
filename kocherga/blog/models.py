from django.db import models

from modelcluster.fields import ParentalKey

from wagtail.core.models import Page, Orderable
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.api import APIField


class BlogIndexPage(Page):
    subpage_types = ['blog.BlogPostPage']

    subtitle = models.TextField('Подзаголовок')

    content_panels = Page.content_panels + [
        FieldPanel('subtitle'),
    ]

    api_fields = [
        APIField('subtitle'),
    ]


class BlogPostPage(Page):
    body = RichTextField('Текст')
    summary = models.TextField('Короткое описание', blank=True)
    date = models.DateField('Дата поста')

    content_panels = Page.content_panels + [
        FieldPanel('date'),
        InlinePanel('authors', label='Авторы'),
        FieldPanel('summary'),
        FieldPanel('body', classname='full'),
    ]

    api_fields = [
        APIField('date'),
        APIField('authors'),
        APIField('body'),
        APIField('summary'),
    ]

    parent_page_types = ['blog.BlogIndexPage']


class BlogPostAuthor(Orderable):
    post = ParentalKey(BlogPostPage, on_delete=models.CASCADE, related_name='authors')

    name = models.CharField('Имя', max_length=80)
    description = models.TextField('Описание', blank=True)
    image = models.ForeignKey(
        'wagtailimages.Image',
        on_delete=models.CASCADE,
        related_name='+',
    )

    panels = [
        FieldPanel('name'),
        FieldPanel('description'),
        ImageChooserPanel('image'),
    ]

    api_fields = [
        APIField('name'),
        APIField('description'),
        APIField('image'),
    ]
