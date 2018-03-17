import kocherga.importer.base
import kocherga.db

from datetime import datetime, timedelta

class SomeImporter(kocherga.importer.base.IncrementalImporter):
    def get_initial_dt(self):
        return datetime.now() - timedelta(days=10)

    def do_period_import(self, from_dt, to_dt, session):
        return datetime.now()
        pass

    def init_db(self):
        pass

def test_importer(db):
    kocherga.db.create_all()
    #kocherga.importer.base.ImporterState.init_db()
    importer = SomeImporter()
    importer.import_all()
    importer.import_new()
