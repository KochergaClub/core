from django.db import models

from wagtail.core.models import Page
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.api import APIField
from wagtail.images.api.fields import ImageRenditionField

from kocherga.wagtail.mixins import HeadlessPreviewMixin


class ProjectIndexPage(HeadlessPreviewMixin, Page):
    subpage_types = ['projects.ProjectPage']


class ProjectPage(HeadlessPreviewMixin, Page):
    summary = models.TextField()
    activity_summary = models.TextField(blank=True, null=True)
    is_active = models.BooleanField()

    body = RichTextField(blank=True)
    image = models.ForeignKey(
        'wagtailimages.Image',
        on_delete=models.PROTECT,
        related_name='+'
    )

    content_panels = Page.content_panels + [
        FieldPanel('is_active'),
        FieldPanel('summary'),
        FieldPanel('activity_summary'),
        ImageChooserPanel('image'),
        FieldPanel('body'),
    ]

    api_fields = [
        APIField('summary'),
        APIField('activity_summary'),
        APIField('body'),
        APIField('is_active'),
        APIField('image', serializer=ImageRenditionField('fill-1080x400')),
        APIField('image_thumbnail', serializer=ImageRenditionField('fill-500x300', source='image')),
    ]
