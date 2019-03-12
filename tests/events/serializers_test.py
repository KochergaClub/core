import pytest
pytestmark = pytest.mark.usefixtures('db')

from kocherga.events.serializers import PublicEventSerializer


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
