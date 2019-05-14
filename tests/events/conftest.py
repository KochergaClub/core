import pytest


@pytest.fixture
def public_event(event):
    event.posted_vk = 'blah'  # should be non-empty
    event.save()
    return event
