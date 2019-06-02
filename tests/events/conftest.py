import pytest


@pytest.fixture
def public_event(event):
    event.vk_announcement.link = 'blah'  # should be non-empty
    event.vk_announcement.save()
    return event
