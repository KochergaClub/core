import datetime

from kocherga.events.models import Event


class TestListEvents:
    def test_list(self, common_events):
        out = Event.objects.all()
        assert len(out) > 3
        assert type(out[0]) == Event

    def test_list_with_date(self, common_events):
        out = Event.objects.all().filter_by_date(date=datetime.datetime.today().date())
        assert 0 < len(out) < 20
        assert type(out[0]) == Event
