import pytest
pytestmark = pytest.mark.usefixtures('db')

import kocherga.events.announce
from kocherga.events.announcement import BaseAnnouncement

def test_announce_timepad(event):
    announcement = kocherga.events.announce.post_to_timepad(event)
    assert isinstance(announcement, BaseAnnouncement)

def test_announce_vk(event):
    announcement = kocherga.events.announce.post_to_vk(event)
    assert isinstance(announcement, BaseAnnouncement)
