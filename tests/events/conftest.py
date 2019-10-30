import pytest


@pytest.fixture
def public_event(event):
    event.timepad_announcement.link = 'blah'  # should be non-empty
    event.timepad_announcement.save()
    return event


@pytest.fixture
def test_google_calendar_id():
    # TODO - create temporary calendar through API instead
    return "22m4r7l6gl1jn9vqokdeq9b7o4@group.calendar.google.com"
