import pytest
import kocherga.events.google

class TestGoogleGetEvent:
    def test_get(self):
        e = kocherga.events.google.get_event("63hhg4l8a6gkejpfaqfkbigape")
        assert e
        assert type(e) == dict

    def test_get_unknown(self):
        with pytest.raises(Exception): # TODO - special exception for EventNotFound
            e = kocherga.events.google.get_event("abcdef")
