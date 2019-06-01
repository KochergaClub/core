import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
    pytest.mark.google,
]

import kocherga.events.models.announcement.timepad


class TestCreate:
    def test_create(self, event_for_timepad):
        ann = event_for_timepad.timepad_announcement
        ann.announce()
        assert ann.link

    def test_create_custom_category(self, event_for_timepad):
        ann = event_for_timepad.timepad_announcement
        ann.category_code = 'it'
        ann.announce()
        assert ann.link


class TestCategories:
    def test_by_code(self):
        result = kocherga.events.models.announcement.timepad.timepad_category_by_code('it')
        assert result.id == 452
        assert result.name == 'ИТ и интернет'
