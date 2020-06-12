import logging
logger = logging.getLogger(__name__)

from django.db import models
from django.core.files.base import ContentFile

from . import api


class TildaPageManager(models.Manager):
    def export_all(self):
        logger.info('Exporting all Tilda pages')
        pages = api.get_pages_list()
        for page in pages:
            self.export_page(page['id'])

    def export_page(self, page_id: int):
        # unfortunately, we need all three (will get it down to two later)
        page_full = api.api_call('getpagefull', {'pageid': page_id})
        page_full_export = api.api_call('getpagefullexport', {'pageid': page_id})
        page_body = api.api_call('getpage', {'pageid': page_id})

        if not page_full['published']:
            return  # not published, should be timestamp

        html = page_full['html']
        alias = page_full['alias']
        filename = page_full['filename']
        title = page_full['title']

        if alias == 'blog' or alias.startswith('blog/'):
            logger.info('/blog got moved to Wagtail')
            return

        if alias == '' and str(page_id) != '44270':
            logger.info('Empty alias but probably not frontpage')
            return

        page, _ = self.update_or_create(
            path=alias,
            defaults={
                'content': ContentFile(html.encode('utf-8'), filename),
                'body': page_body['html'],
                'title': title,
            }
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


class Asset(models.Model):
    url = models.URLField(max_length=255)
    kind = models.CharField(
        max_length=10,
        choices=[
            (x, x)
            for x in ('css', 'js', 'image')
        ]
    )


class TildaPage(models.Model):
    path = models.CharField(max_length=255, unique=True)
    content = models.FileField(upload_to='tilda/')
    body = models.TextField(default='')
    title = models.CharField(max_length=1024, default='')

    assets = models.ManyToManyField(Asset)

    objects = TildaPageManager()
