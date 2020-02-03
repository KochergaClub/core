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
        page_full = api.get_page_full(page_id)
        if not page_full['published']:
            return  # not published, should be timestamp

        html = page_full['html']
        alias = page_full['alias']
        filename = page_full['filename']

        if alias == 'blog' or alias.startswith('blog/'):
            logger.info('/blog got moved to Wagtail')
            return

        if alias == '' and str(page_id) != '44270':
            logger.info('Empty alias but probably not frontpage')
            return

        self.update_or_create(
            path=alias,
            defaults={
                'content': ContentFile(html.encode('utf-8'), filename),
            }
        )


class TildaPage(models.Model):
    path = models.CharField(max_length=255, unique=True)
    content = models.FileField(upload_to='tilda/')

    objects = TildaPageManager()
