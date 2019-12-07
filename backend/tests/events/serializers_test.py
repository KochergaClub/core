from datetime import datetime

from kocherga.events import serializers


class TestPublicEventSerializer:
    def test_serialize(self, event):
        data = serializers.PublicEventSerializer(event).data

        assert data['title'] == event.title
        assert data['room'] == 'ГЭБ'
        assert type(data['start']) == str
        assert '+03:00' in data['start']

    def test_serialize_private(self, event):
        event.event_type = 'private'
        data = serializers.PublicEventSerializer(event).data

        assert 'title' not in data
        assert len(data) == 0


class TestEventSerializer:
    def test_serialize_event(self, event):
        data = serializers.EventSerializer(event).data

        assert data['title'] == event.title

        assert data['room'] == 'гэб'
        assert data['location'] == 'ГЭБ'

        assert type(data['start']) == str
        assert '+03:00' in data['start']

        assert data['tags'] == []

        from pprint import pprint
        pprint(data)

    def test_create(self):
        serializer = serializers.EventSerializer(data={
            'title': 'foo',
            'start': datetime(2019, 3, 1, 14, 0),
            'end': datetime(2019, 3, 1, 15, 0),
            'foo': 'bar',
        })
        serializer.is_valid(raise_exception=True)
        event = serializer.save()

        assert event.title == 'foo'
        assert event.start

    def test_update(self, event):
        serializer = serializers.EventSerializer(event, data={
            'title': 'updated',
        }, partial=True)
        serializer.is_valid(raise_exception=True)
        event = serializer.save()

        assert event.title == 'updated'

    def test_update_prototype(self, event, common_prototype):
        serializer = serializers.EventSerializer(event, data={
            'prototype_id': common_prototype.pk,
        }, partial=True)

        serializer.is_valid(raise_exception=True)
        event = serializer.save()

        assert event.prototype == common_prototype


class TestEventPrototypeSerializer:
    def test_serialize(self, common_prototype):
        ep = common_prototype
        data = serializers.EventPrototypeSerializer(ep).data

        assert data['title'] == ep.title