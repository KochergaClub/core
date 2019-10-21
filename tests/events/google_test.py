import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
    pytest.mark.google,
]

from kocherga.events.models import GoogleCalendar, GoogleEvent


class TestExport:
    def test_export_once(self, event):
        google_calendar = GoogleCalendar.objects.create(
            # TODO - create temporary calendar through API instead
            calendar_id="22m4r7l6gl1jn9vqokdeq9b7o4@group.calendar.google.com"
        )

        google_calendar.export_event(event)

        google_events = list(GoogleEvent.objects.all())
        assert len(google_events) == 1
        assert google_events[0].google_calendar == google_calendar
        assert google_events[0].event == event

    def test_export_twice(self, event):
        google_calendar = GoogleCalendar.objects.create(
            # TODO - create temporary calendar through API instead
            calendar_id="22m4r7l6gl1jn9vqokdeq9b7o4@group.calendar.google.com"
        )

        google_calendar.export_event(event)

        event.refresh_from_db()
        google_calendar.export_event(event)

        google_events = list(GoogleEvent.objects.all())
        assert len(google_events) == 1
        assert google_events[0].google_calendar == google_calendar
        assert google_events[0].event == event
