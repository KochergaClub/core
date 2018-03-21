from kocherga.importer.base import IncrementalImporter, ImporterState, ImporterLogEntry
import kocherga.db

from datetime import datetime, timedelta
from kocherga.config import TZ

class SomeImporter(IncrementalImporter):
    def get_initial_dt(self):
        return datetime.now() - timedelta(days=10)

    def do_period_import(self, from_dt, to_dt, session):
        return datetime.now()
        pass

    def init_db(self):
        pass

def test_import_new(db):
    importer = SomeImporter()
    importer.import_new()

    state = kocherga.db.Session().query(ImporterState).filter(ImporterState.name == 'test_importer.SomeImporter').first()
    assert state.last_exception == None
    assert abs(datetime.now(tz=TZ).timestamp() - state.last_ts) < 5

def test_import_all(db):
    importer = SomeImporter()
    importer.import_all()

    state = kocherga.db.Session().query(ImporterState).filter(ImporterState.name == 'test_importer.SomeImporter').first()
    assert state.last_exception == None
    assert abs(datetime.now(tz=TZ).timestamp() - state.last_ts) < 5
