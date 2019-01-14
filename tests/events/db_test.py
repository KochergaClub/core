import pytest
pytestmark = pytest.mark.usefixtures('db')

import datetime

from kocherga.events.event import Event
import kocherga.events.db

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
        event_for_edits.patch({ 'title': 'blah' })
        assert event.title == 'blah'

@pytest.mark.django_db(transaction=True)
class TestImporter:
    def test_importer(self, db):
        importer = kocherga.events.db.Importer()
        importer.import_all()
        assert len(Event.objects.all()) > 10

    def test_importer_doesnt_override_summary(self, db):
        importer = kocherga.events.db.Importer()
        importer.import_all()

        e = Event.objects.all()[0]
        print(e.google_id)
        e.summary = 'asdf'
        e.save()

        e = Event.objects.all()[0]
        assert e.summary == 'asdf'

        importer.import_all()

        e = Event.objects.all()[0]
        assert e.summary == 'asdf'
