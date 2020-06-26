import kocherga.importer.base

from .models import User


class Importer(kocherga.importer.base.FullImporter):
    def do_full_import(self):
        User.objects.import_from_slack()
