import pytest

import logging
from datetime import datetime, timedelta

from kocherga.events.event import Event
import kocherga.events.db
from kocherga.db import Session

pytestmark = pytest.mark.usefixtures('db')

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

def test_to_dict(google_object):
    event = Event.from_google(google_object)
    assert type(event.to_dict()) == dict
    print(event.to_dict())

class TestImages:
    def test_get_images(self, google_object):
        event = Event.from_google(google_object)

        assert event.get_images() is not None

    def test_add_image(self, event_for_edits, image_file):
        event = event_for_edits

        with open(image_file, 'rb') as fh:
            event.add_image('default', fh)

        assert event.image_file('default')
        Session().commit()
        assert event.image_file('default')

        event = kocherga.events.db.get_event(event.google_id) # reloading for another check
        assert event.image_file('default')
