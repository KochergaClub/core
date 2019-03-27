import pytest
pytestmark = pytest.mark.google

import datetime

import kocherga.events.google


class TestGet:
    def test_get(self):
        e = kocherga.events.google.get_event("63hhg4l8a6gkejpfaqfkbigape")
        assert e
        assert type(e) == dict

    def test_get_unknown(self):
        with pytest.raises(Exception):  # TODO - special exception for EventNotFound
            kocherga.events.google.get_event("abcdef")


class TestList:
    def test_list_all(self):
        events = kocherga.events.google.list_events(
            from_date=datetime.date(2015, 1, 1),
            to_date=datetime.date(2020, 1, 1)
        )
        assert type(events) == list
        assert len(events) > 300
