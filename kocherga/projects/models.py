from django.db import models

from wagtail.core.models import Page
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.api import APIField
from wagtail.images.api.fields import ImageRenditionField


class ProjectPage(Page):
    summary = models.TextField()
    body = RichTextField(blank=True)
    image = models.ForeignKey(
        'wagtailimages.Image',
        on_delete=models.PROTECT,
        related_name='+'
    )

    content_panels = Page.content_panels + [
        FieldPanel('summary'),
        FieldPanel('image'),
        FieldPanel('body'),
    ]

    api_fields = [
        APIField('summary'),
        APIField('body'),
        APIField('image', serializer=ImageRenditionField('fill-1080x400')),
        APIField('image_thumbnail', serializer=ImageRenditionField('fill-500x300', source='image')),
    ]
