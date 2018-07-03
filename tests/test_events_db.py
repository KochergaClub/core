import pytest
pytestmark = pytest.mark.usefixtures('db')

import datetime

from kocherga.events.event import Event
import kocherga.events.db
import kocherga.db

class TestGetEvent:
    def test_get(self, db, event, imported_events):
        e = kocherga.events.db.get_event(event.google_id)
        assert e
        assert type(e) == Event

        assert type(e.created_dt) == datetime.datetime
        assert type(e.start_dt) == datetime.datetime
        assert type(e.end_dt) == datetime.datetime
        assert e.title == 'Элиезер проповедь'
        assert e.description.startswith('chicken')
        assert e.is_master == False
        assert e.master_id is None

        assert e.get_room() == 'гэб'
        assert e.is_private() == False

        print(e.to_dict())

class TestListEvents:
    def test_list(self, db, imported_events):
        out = kocherga.events.db.list_events()
        assert type(out) == list
        assert len(out) > 10
        assert type(out[0]) == Event

    def test_list_with_date(self, db, imported_events):
        out = kocherga.events.db.list_events(date=datetime.datetime.today().date())
        assert type(out) == list
        assert 0 < len(out) < 20
        assert type(out[0]) == Event

class TestPatchEvent:
    def test_patch(self, db, event_for_edits):
        event = event_for_edits
        patched = kocherga.events.db.patch_event(event.google_id, { 'title': 'blah' })

        assert type(patched) == Event
        assert patched.title == 'blah'

class TestImporter:
    def test_importer(self, db):
        importer = kocherga.events.db.Importer()
        importer.import_all()
        assert kocherga.db.Session().query(Event).count() > 10

    def test_importer_doesnt_override_summary(self, db):
        importer = kocherga.events.db.Importer()
        importer.import_all()

        session = kocherga.db.Session()
        e = session.query(Event).first()
        print(e.google_id)
        e.summary = 'asdf'
        session.commit()

        e = session.query(Event).first()
        assert e.summary == 'asdf'

        importer.import_all()

        session = kocherga.db.Session()
        e = session.query(Event).first()
        assert e.summary == 'asdf'
