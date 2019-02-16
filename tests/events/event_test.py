import pytest

import logging
from datetime import datetime, timedelta, date

from kocherga.events.models import Event, Tag
import kocherga.events.db
import django.db

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

def test_default_event_type(google_object):
    event = Event.from_google(google_object)
    assert event.event_type == "unknown"

def test_to_dict(google_object):
    event = Event.from_google(google_object)
    assert type(event.to_dict()) == dict


class TestGetEvent:
    def test_get(self, db, event, imported_events):
        e = Event.by_id(event.google_id)
        assert e
        assert type(e) == Event

        assert type(e.created_dt) == datetime
        assert type(e.start_dt) == datetime
        assert type(e.end_dt) == datetime
        assert e.title == 'Элиезер проповедь'
        assert e.description.startswith('chicken')
        assert e.is_master == False
        assert e.master_id == ''

        assert e.get_room() == 'гэб'


class TestImages:
    def test_get_images(self, google_object):
        event = Event.from_google(google_object)

        assert event.get_images() is not None

    def test_add_image(self, event_for_edits, image_file):
        event = event_for_edits

        with open(image_file, 'rb') as fh:
            event.add_image('default', fh)

        assert event.image_file('default')

        event = kocherga.events.db.get_event(event.google_id) # reloading for another check
        assert event.image_file('default')

def test_delete(google_object):
    event = Event.from_google(dict(google_object, summary='лекция'))
    event.delete()
    assert event.to_google()['status'] == 'cancelled'

class TestTags:
    def test_list_default_tags(self, event):
        assert list(event.tags.all()) == []

    def test_set_tags(self, event):
        event.add_tag('foo')
        event.add_tag('bar')
        event_id = event.google_id

        event = Event.objects.get(pk=event_id)
        tags = event.tags.all()
        assert len(tags) == 2
        assert tags[0].name == 'bar' # tags are sorted by name
        assert tags[1].name == 'foo'

    def test_delete_tags(self, event):
        event.add_tag('foo')
        event.delete_tag('foo')

class TestManager:
    def test_public_events_empty(self):
        public_events = Event.objects.public_events(date=date(2019,1,12))
        assert type(public_events) == django.db.models.query.QuerySet
        assert public_events.count() == 0

    def test_public_events_single(self, event):
        event.posted_vk = 'blah' # should be non-empty
        event.save()

        public_events = Event.objects.public_events(date=event.start_dt.date())

        assert type(public_events) == django.db.models.query.QuerySet
        assert public_events.count() == 1
