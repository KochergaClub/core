from __future__ import annotations

import logging
from typing import Optional

logger = logging.getLogger(__name__)

from django.conf import settings
from django.db import models
from django.utils import timezone
from wagtail.admin import edit_handlers
from wagtail.images import edit_handlers as images_edit_handlers

from . import api


class TildaPageManager(models.Manager):
    def import_all(self):
        logger.info('Exporting all Tilda pages')
        pages = api.get_pages_list()
        for page in pages:
            self.import_page(page['id'])

    def import_page(self, page_id: int) -> Optional[TildaPage]:
        # unfortunately, we need both
        page_full_export = api.api_call('getpagefullexport', {'pageid': page_id})
        page_body = api.api_call('getpage', {'pageid': page_id})

        if not page_body['published']:
            return  # not published, should be timestamp

        alias = page_body['alias']
        title = page_body['title']
        description = page_body['descr']

        if alias == 'blog' or alias.startswith('blog/'):
            logger.info('/blog got moved to Wagtail')
            return

        if alias == '' and str(page_id) != '44270':
            logger.info('Empty alias but probably not frontpage')
            return

        page, _ = self.update_or_create(
            path=alias,
            defaults={
                'body': page_body['html'],
                'title': title,
                'description': description,
                'page_id': page_id,
                'imported_dt': timezone.now(),
            },
        )

        # now let's build the list of assets

        assets = []
        for kind in ('image', 'js', 'css'):
            key = 'images' if kind == 'image' else kind
            for item in page_full_export[key]:
                asset, _ = Asset.objects.update_or_create(
                    url=item['from'],
                    kind=kind,
                )
                assets.append(asset)

        page.assets.set(assets)
        page.save()
        return page


class Asset(models.Model):
    url = models.URLField(max_length=255)
    kind = models.CharField(
        max_length=10, choices=[(x, x) for x in ('css', 'js', 'image')]
    )


class TildaPage(models.Model):
    # imported fields - not editable
    path = models.CharField(max_length=255, unique=True, editable=False)
    body = models.TextField(default='', editable=False)
    title = models.CharField(max_length=1024, default='', editable=False)
    description = models.CharField(max_length=1024, default='', editable=False)
    page_id = models.IntegerField(editable=False, default=0)
    imported_dt = models.DateTimeField(blank=True, null=True)

    assets = models.ManyToManyField(Asset)

    # these fields are can be configured through Kocherga website
    show_header_and_footer = models.BooleanField(default=True)
    og_image = models.ForeignKey(
        'kocherga_wagtail.CustomImage',
        on_delete=models.PROTECT,
        related_name='+',
        null=True,
        blank=True,
    )

    objects = TildaPageManager()

    def __str__(self):
        return self.path

    def get_tilda_edit_link(self):
        return f'https://tilda.cc/page/?pageid={self.page_id}&projectid={settings.TILDA_PROJECT_ID}'

    panels = [
        edit_handlers.FieldPanel('show_header_and_footer'),
        images_edit_handlers.ImageChooserPanel('og_image'),
        # TODO - show tilda edit link in custom panel
    ]
