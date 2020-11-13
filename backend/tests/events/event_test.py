from datetime import date, datetime, timedelta

import pytest
from kocherga.dateutils import TZ
from kocherga.events.models import Event


class TestEventConstructor:
    def test_minimal(self):
        event = Event(
            start=datetime.now(TZ),
            end=datetime.now(TZ) + timedelta(hours=1),
        )
        assert isinstance(event, Event)


def test_get_room(event):
    assert event.get_room() == 'гэб'


def test_default_event_type():
    dt = datetime.now(TZ)
    event = Event.objects.create(
        start=dt,
        end=dt + timedelta(hours=1),
        title='test event',
    )
    assert event.event_type == "unknown"


class TestGetEvent:
    def test_get(self, db, event):
        e = Event.objects.get(pk=event.pk)
        assert e
        assert type(e) == Event

        assert type(e.created) == datetime
        assert type(e.start) == datetime
        assert type(e.end) == datetime
        assert e.title == 'Элиезер проповедь'
        assert e.description.startswith('chicken')

        assert e.get_room() == 'гэб'


def test_delete(event):
    event.delete()
    event = Event.all_objects.get(pk=event.pk)
    assert event.deleted is True
    with pytest.raises(Event.DoesNotExist):
        event = Event.objects.get(pk=event.pk)


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
        public_events = Event.objects.public_only().filter_by_date(
            date=date(2019, 1, 12)
        )
        assert public_events.count() == 0

    def test_public_events_only_public(self, event):
        public_events = Event.objects.public_only().filter_by_date(
            date=event.start.date()
        )
        assert public_events.count() == 0

    def test_public_events_single(self, public_event):
        public_events = Event.objects.public_only().filter_by_date(
            date=public_event.start.date()
        )
        assert public_events.count() == 1
