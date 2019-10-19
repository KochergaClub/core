import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
    pytest.mark.google,
]

from datetime import datetime, timedelta, date

from kocherga.dateutils import TZ
from kocherga.events.models import Event
from kocherga.events import serializers
import django.db


class TestEventConstructor:
    def test_minimal(self):
        event = Event(
            start = datetime.now(TZ),
            end = datetime.now(TZ) + timedelta(hours=1),
        )
        assert type(event) == Event


class TestEventFromGoogle:
    def test_from_google(self, google_object):
        event = Event.from_google(google_object)
        assert type(event) == Event

    def test_from_google_datatypes(self, google_object):
        event = Event.from_google(google_object)
        assert type(event.created) == datetime
        assert type(event.start) == datetime
        assert type(event.end) == datetime


def test_get_room(google_object):
    event = Event.from_google(google_object)
    assert event.get_room() == 'летняя'


def test_default_event_type(google_object):
    event = Event.from_google(google_object)
    assert event.event_type == "unknown"


def test_serialize(google_object):
    event = Event.from_google(google_object)
    event.save()
    data = serializers.EventSerializer(event).data
    assert type(data['start']) == str
    assert data['posted_vk'] == ''
    assert data['tags'] == []


class TestGetEvent:
    def test_get(self, db, event, imported_events):
        e = Event.by_id(event.google_id)
        assert e
        assert type(e) == Event

        assert type(e.created) == datetime
        assert type(e.start) == datetime
        assert type(e.end) == datetime
        assert e.title == 'Элиезер проповедь'
        assert e.description.startswith('chicken')

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

        event = Event.objects.get(pk=event.google_id)  # reloading for another check
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

        event = Event.objects.get(pk=event.pk)
        tags = event.tags.all()
        assert len(tags) == 2
        assert tags[0].name == 'bar'  # tags are sorted by name
        assert tags[1].name == 'foo'

    def test_delete_tags(self, event):
        event.add_tag('foo')
        event.delete_tag('foo')


class TestManager:
    def test_public_events_empty(self):
        public_events = Event.objects.public_events(date=date(2019, 1, 12))
        assert type(public_events) == django.db.models.query.QuerySet
        assert public_events.count() == 0

    def test_public_events_only_public(self, event):
        public_events = Event.objects.public_events(date=event.start.date())
        assert type(public_events) == django.db.models.query.QuerySet
        assert public_events.count() == 0

    def test_public_events_single(self, public_event):
        public_events = Event.objects.public_events(date=public_event.start.date())

        assert type(public_events) == django.db.models.query.QuerySet
        assert public_events.count() == 1
