import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
    pytest.mark.google,
]

import datetime

from kocherga.events.models import Event
import kocherga.events.importer


class TestListEvents:
    def test_list(self, imported_events):
        out = Event.objects.list_events()
        assert len(out) > 10
        assert type(out[0]) == Event

    def test_list_with_date(self, imported_events):
        out = Event.objects.list_events(date=datetime.datetime.today().date())
        assert 0 < len(out) < 20
        assert type(out[0]) == Event


@pytest.mark.django_db(transaction=True)
class TestImporter:
    def test_importer(self):
        importer = kocherga.events.importer.Importer()
        importer.import_all()
        assert len(Event.objects.all()) > 10

    def test_importer_doesnt_override_summary(self):
        importer = kocherga.events.importer.Importer()
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
