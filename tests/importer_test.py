import pytest
from datetime import datetime, timedelta

from kocherga.importer.base import IncrementalImporter, ImporterState, ImporterLogEntry
import kocherga.db

from kocherga.config import TZ

class SomeImporter(IncrementalImporter):
    def get_initial_dt(self):
        return datetime.now() - timedelta(days=10)

    def do_period_import(self, from_dt, to_dt, session):
        return datetime.now()
        pass

def test_import_new(db):
    importer = SomeImporter()
    importer.import_new()

    state = kocherga.db.Session().query(ImporterState).filter(ImporterState.name == 'importer_test.SomeImporter').first()
    assert state.last_exception == None
    assert abs(datetime.now(tz=TZ).timestamp() - state.last_ts) < 5

def test_import_all(db):
    importer = SomeImporter()
    importer.import_all()

    state = kocherga.db.Session().query(ImporterState).filter(ImporterState.name == 'importer_test.SomeImporter').first()
    assert state.last_exception == None
    assert abs(datetime.now(tz=TZ).timestamp() - state.last_ts) < 5


class BadImporter(SomeImporter):
    def do_period_import(self, from_dt, to_dt, session):
        raise Exception("Something went terribly wrong")

def test_import_bad(db):
    importer = BadImporter()

    with pytest.raises(Exception, match='.*terribly wrong'):
      importer.import_all()

    state = kocherga.db.Session().query(ImporterState).filter(ImporterState.name == 'importer_test.BadImporter').first()
    assert 'terribly wrong' in state.last_exception
    assert abs(datetime.now(tz=TZ).timestamp() - state.last_ts) < 5
