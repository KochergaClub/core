import logging
logger = logging.getLogger(__name__)

from datetime import datetime

from django.db import models

from rest_framework.serializers import Field

from wagtail.core.models import Page
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel
from wagtail.api import APIField
from wagtail.images.api.fields import ImageRenditionField

from kocherga.wagtail.mixins import HeadlessPreviewMixin
from kocherga.wagtail.fields import APIRichTextField
from kocherga.dateutils import TZ
from kocherga.events.serializers import PublicEventSerializer


class UpcomingEventsField(Field):
    def to_representation(self, value):
        qs = value.filter(event_type='public', published=True) \
                  .filter(start__gte = datetime.now(TZ)) \
                  .order_by('start')

        return PublicEventSerializer(qs, many=True).data


class ProjectIndexPage(HeadlessPreviewMixin, Page):
    subpage_types = ['projects.ProjectPage']
    parent_page_types = ['pages.FrontPage']


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
        APIRichTextField('body'),
        APIField('is_active'),
        APIField('image', serializer=ImageRenditionField('fill-1080x400')),
        APIField('image_thumbnail', serializer=ImageRenditionField('fill-500x300', source='image')),
        APIField('upcoming_events', serializer=UpcomingEventsField(source='events')),
    ]

    parent_page_types = ['projects.ProjectIndexPage']
