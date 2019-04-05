import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
    pytest.mark.google,
]

from datetime import datetime

from kocherga.events.serializers import PublicEventSerializer, EventSerializer


class TestPublicSerializer:
    def test_serialize(self, event):
        data = PublicEventSerializer(event).data

        assert data['title'] == event.title
        assert data['room'] == 'ГЭБ'
        assert type(data['start']) == str
        assert '+03:00' in data['start']

    def test_serialize_private(self, event):
        event.event_type = 'private'
        data = PublicEventSerializer(event).data

        assert 'title' not in data
        assert len(data) == 0


class TestSerializer:
    def test_serialize(self, event):
        data = EventSerializer(event).data

        assert data['title'] == event.title

        assert data['room'] == 'гэб'
        assert data['location'] == 'ГЭБ'

        assert type(data['start']) == str
        assert '+03:00' in data['start']

        assert data['tags'] == []

    def test_create(self):
        serializer = EventSerializer(data={
            'title': 'foo',
            'start': datetime(2019, 3, 1, 14, 0),
            'end': datetime(2019, 3, 1, 15, 0),
            'foo': 'bar',
        })
        serializer.is_valid(raise_exception=True)
        event = serializer.save()

        assert event.title == 'foo'
        assert event.start
