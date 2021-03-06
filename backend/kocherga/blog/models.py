from django.db import models

from modelcluster.fields import ParentalKey

from wagtail.core.models import Orderable
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel, InlinePanel
from wagtail.images.edit_handlers import ImageChooserPanel

from kocherga.wagtail.models import KochergaPage


class BlogIndexPage(KochergaPage):
    subtitle = models.TextField('Подзаголовок')

    content_panels = KochergaPage.content_panels + [
        FieldPanel('subtitle'),
    ]

    subpage_types = ['blog.BlogPostPage']
    parent_page_types = ['pages.FrontPage']
    max_count = 1

    @property
    def posts(self):
        return BlogPostPage.objects.child_of(self).live().order_by('-date')

    graphql_type = 'BlogIndexPage'


class BlogPostPage(KochergaPage):
    body = RichTextField('Текст')
    summary = models.TextField('Короткое описание', blank=True)
    date = models.DateField('Дата поста')

    content_panels = KochergaPage.content_panels + [
        FieldPanel('date'),
        InlinePanel('authors', label='Авторы'),
        FieldPanel('summary'),
        FieldPanel('body', classname='full'),
    ]

    graphql_type = 'BlogPostPage'

    parent_page_types = ['blog.BlogIndexPage']


class BlogPostAuthor(Orderable):
    post = ParentalKey(BlogPostPage, on_delete=models.CASCADE, related_name='authors')

    name = models.CharField('Имя', max_length=80)
    description = models.TextField('Описание', blank=True)
    image = models.ForeignKey(
        'kocherga_wagtail.CustomImage', on_delete=models.PROTECT, related_name='+',
    )

    panels = [
        FieldPanel('name'),
        FieldPanel('description'),
        ImageChooserPanel('image'),
    ]
