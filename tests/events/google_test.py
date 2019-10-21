import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
    pytest.mark.google,
]

from kocherga.events.models import GoogleCalendar, GoogleEvent


class TestExport:
    def test_export_once(self, event, test_google_calendar_id):
        google_calendar = GoogleCalendar.objects.create(
            calendar_id=test_google_calendar_id,
            public_only=False,
        )

        google_calendar.export_event(event)

        google_events = list(GoogleEvent.objects.all())
        assert len(google_events) == 1
        assert google_events[0].google_calendar == google_calendar
        assert google_events[0].event == event

    def test_export_twice(self, event, test_google_calendar_id):
        google_calendar = GoogleCalendar.objects.create(
            calendar_id=test_google_calendar_id,
            public_only=False,
        )

        google_calendar.export_event(event)

        event.refresh_from_db()
        google_calendar.export_event(event)

        google_events = list(GoogleEvent.objects.all())
        assert len(google_events) == 1
        google_event = google_events[0]
        assert google_event.google_calendar == google_calendar
        assert google_event.event == event

        # no accidental invites
        # (compare with booking test and see Event.invite_creator for details)
        assert 'attendees' not in google_event.load_google_data()

    def test_export_to_public(self, event, test_google_calendar_id):
        google_calendar = GoogleCalendar.objects.create(
            calendar_id=test_google_calendar_id,
        )

        google_calendar.export_event(event)

        event.refresh_from_db()
        google_calendar.export_event(event)

        google_events = list(GoogleEvent.objects.all())
        assert len(google_events) == 0  # event doesn't have vk announcement so it won't be exported
