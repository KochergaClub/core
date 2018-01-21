from kocherga.events.event import Event
from datetime import datetime, timedelta

class TestEventConstructor:
    def test_minimal(self):
        event = Event(start_dt=datetime.today(), end_dt=datetime.today() + timedelta(hours=1))
        assert type(event) == Event

class TestEventFromGoogle:
    def test_from_google(self, google_object):
        event = Event.from_google(google_object)
        assert type(event) == Event

    def test_from_google_datatypes(self, google_object):
        event = Event.from_google(google_object)
        assert type(event.created_dt) == datetime
        assert type(event.start_dt) == datetime
        assert type(event.end_dt) == datetime

def test_get_room(google_object):
    event = Event.from_google(google_object)
    assert event.get_room() == 'летняя'

def test_is_private(google_object):
    event = Event.from_google(google_object)
    assert event.is_private() == True

def test_is_private_not_booking(google_object):
    event = Event.from_google(dict(google_object, summary='лекция'))
    assert event.is_private() == False

class TestImages:
    def test_get_images(self, google_object):
        event = Event.from_google(google_object)

        assert event.get_images() is not None
