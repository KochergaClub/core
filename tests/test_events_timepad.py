import kocherga.events.timepad
from kocherga.events.timepad import TimepadAnnouncement

class TestAnnouncement:
    def test_announcement_link(self):
        t = TimepadAnnouncement(123)

        assert t.link == 'https://kocherga-dev.timepad.ru/event/123'

class TestCreate:
    def test_create(self, event):
        result = kocherga.events.timepad.create(event)
        assert type(result), TimepadAnnouncement
