import kocherga.importer.base
from .tools import load_schedule_from_google

class Importer(kocherga.importer.base.FullImporter):
    def do_full_import(self, session):
        load_schedule_from_google().save_to_db(session)
