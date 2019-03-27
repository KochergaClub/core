import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
    pytest.mark.google,
]

import kocherga.events.announce
from kocherga.events.announcement import BaseAnnouncement


def test_announce_timepad(event_for_timepad):
    announcement = kocherga.events.announce.post_to_timepad(event_for_timepad)
    assert isinstance(announcement, BaseAnnouncement)


def test_announce_vk(event):
    announcement = kocherga.events.announce.post_to_vk(event)
    assert isinstance(announcement, BaseAnnouncement)
