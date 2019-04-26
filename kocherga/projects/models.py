from django.db import models

from wagtail.core.models import Page
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.api import APIField
from wagtail.images.api.fields import ImageRenditionField


class ProjectPage(Page):
    summary = models.TextField()
    image = models.ForeignKey(
        'wagtailimages.Image',
        blank=True,
        null=True,
        on_delete=models.PROTECT,
        related_name='+'
    )

    content_panels = Page.content_panels + [
        FieldPanel('summary'),
        FieldPanel('image'),
    ]

    api_fields = [
        APIField('summary'),
        APIField('image', serializer=ImageRenditionField('fill-1080x400')),
        APIField('image_thumbnail', serializer=ImageRenditionField('fill-500x300', source='image')),
    ]
