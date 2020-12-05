import logging

logger = logging.getLogger(__name__)

import kocherga.importer.base

from . import models


class Importer(kocherga.importer.base.FullImporter):
    def do_full_import(self):
        for obj in models.Chat.objects.all():
            obj.update_from_api()
