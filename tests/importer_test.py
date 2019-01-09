import pytest


from datetime import datetime, timedelta

from kocherga.importer.base import IncrementalImporter, State, LogEntry

from kocherga.config import TZ


class SomeImporter(IncrementalImporter):
    def get_initial_dt(self):
        return datetime.now(TZ) - timedelta(days=10)

    def do_period_import(self, from_dt, to_dt, session):
        return datetime.now(TZ)
        pass

@pytest.mark.django_db(transaction=True)
def test_import_new(db):
    importer = SomeImporter()
    importer.import_new()

    state = State.objects.get(name='importer_test.SomeImporter')
    assert state.last_exception == None
    assert (datetime.now(tz=TZ)- state.last_dt).seconds < 5

@pytest.mark.django_db(transaction=True)
def test_import_all(db):
    importer = SomeImporter()
    importer.import_all()

    state = State.objects.get(name='importer_test.SomeImporter')
    assert state.last_exception == None
    assert (datetime.now(tz=TZ) - state.last_dt).seconds < 5


class BadImporter(SomeImporter):
    def do_period_import(self, from_dt, to_dt, session):
        raise Exception("Something went terribly wrong")

@pytest.mark.django_db(transaction=True)
def test_import_bad(db):
    importer = BadImporter()

    with pytest.raises(Exception, match='.*terribly wrong'):
      importer.import_all()

    state = State.objects.get(name='importer_test.BadImporter')
    assert 'terribly wrong' in state.last_exception
    assert (datetime.now(tz=TZ) - state.last_dt).seconds < 5
