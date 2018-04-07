import pytest
pytestmark = pytest.mark.usefixtures('db')

import kocherga.events.timepad
from kocherga.events.timepad import TimepadAnnouncement

class TestAnnouncement:
    def test_announcement_link(self):
        t = TimepadAnnouncement(123)

        assert t.link == 'https://kocherga-dev.timepad.ru/event/123'

class TestCreate:
    def test_create(self, event_for_timepad):
        result = kocherga.events.timepad.create(event_for_timepad)
        assert isinstance(result, TimepadAnnouncement)

    def test_create_custom_category(self, event_for_timepad):
        event_for_timepad.timepad_category_code = 'it'
        result = kocherga.events.timepad.create(event_for_timepad)
        assert isinstance(result, TimepadAnnouncement)

class TestCategories:
    def test_by_code(self):
        result = kocherga.events.timepad.timepad_category_by_code('it')
        assert result.id == 452
        assert result.name == 'ИТ и интернет'
