from django.core.validators import RegexValidator
from django.db import models
from kocherga.django.managers import RelayQuerySet
from wagtail.admin import edit_handlers
from wagtail.core.fields import RichTextField
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.snippets.edit_handlers import SnippetChooserPanel
from wagtail.snippets.models import register_snippet
from wagtailorderable.models import Orderable


@register_snippet
class TestimonialProduct(models.Model):
    title = models.CharField(max_length=80)
    color = models.CharField(
        max_length=7, validators=[RegexValidator(r'^#[0-9a-f]{6}$')]
    )
    link = models.CharField(max_length=256)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Продукт для отзыва'
        verbose_name_plural = 'Продукты для отзывов'


@register_snippet
class Testimonial(Orderable, models.Model):
    author_image = models.ForeignKey(
        'kocherga_wagtail.CustomImage',
        null=True,
        blank=True,
        on_delete=models.PROTECT,
        related_name='+',
    )

    author_name = models.CharField(max_length=80)
    author_description = models.CharField(max_length=1024, blank=True)

    text = RichTextField()
    product = models.ForeignKey(
        TestimonialProduct,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='testimonials',
    )

    objects = RelayQuerySet.as_manager()

    def __str__(self):
        return self.author_name

    class Meta:
        verbose_name = 'Отзыв'
        verbose_name_plural = 'Отзывы'

    panels = [
        ImageChooserPanel('author_image'),
        edit_handlers.FieldPanel('author_name'),
        edit_handlers.FieldPanel('author_description'),
        SnippetChooserPanel('product'),
        edit_handlers.FieldPanel('text'),
    ]
