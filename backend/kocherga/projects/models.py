import logging
logger = logging.getLogger(__name__)

from datetime import datetime

from django.db import models

from rest_framework.serializers import Field

from wagtail.core.models import Page
from wagtail.core.fields import RichTextField
from wagtail.admin.edit_handlers import FieldPanel
from wagtail.images.edit_handlers import ImageChooserPanel

from kocherga.wagtail.mixins import HeadlessPreviewMixin
from kocherga.dateutils import TZ
from kocherga.events.serializers import PublicEventSerializer


class UpcomingEventsField(Field):
    def to_representation(self, value):
        qs = value.filter(event_type='public', published=True, deleted=False) \
                  .filter(start__gte = datetime.now(TZ)) \
                  .order_by('start')

        return PublicEventSerializer(qs, many=True).data


class ProjectIndexPage(HeadlessPreviewMixin, Page):
    subpage_types = ['projects.ProjectPage']
    parent_page_types = ['pages.FrontPage']

    graphql_type = 'ProjectIndexPage'


class ProjectPage(HeadlessPreviewMixin, Page):
    summary = models.TextField('Короткое описание')
    activity_summary = models.TextField('Периодичность', blank=True, null=True)
    is_active = models.BooleanField('Активный')

    body = RichTextField('Описание', blank=True)
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

    parent_page_types = ['projects.ProjectIndexPage']

    graphql_type = 'ProjectPage'

    class Meta:
        verbose_name = 'Проект'
        verbose_name_plural = 'Проекты'

    @property
    def upcoming_events(self):
        qs = self.events.filter(event_type='public', published=True, deleted=False) \
                        .filter(start__gte = datetime.now(TZ)) \
                        .order_by('start')

        return qs
