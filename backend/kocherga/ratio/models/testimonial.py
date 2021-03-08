from django.db import models
from kocherga.django.managers import RelayQuerySet
from wagtail.admin import edit_handlers
from wagtail.core.fields import RichTextField
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtailorderable.models import Orderable


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

    objects = RelayQuerySet.as_manager()

    def __str__(self):
        return self.author_name

    panels = [
        ImageChooserPanel('author_image'),
        edit_handlers.FieldPanel('author_name'),
        edit_handlers.FieldPanel('author_description'),
        edit_handlers.FieldPanel('text'),
    ]
