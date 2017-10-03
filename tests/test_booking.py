import pytest
import kocherga.events.booking
import kocherga.events
from kocherga.common import PublicError
from datetime import datetime, timedelta

class TestBooking:
    EVENT = {
        "kind": "calendar#event",
        "etag": "\"2910222046236000\"",
        "id": "9v1o4njhrkg7a86nnd4es51im4",
        "status": "confirmed",
        "htmlLink": "https://www.google.com/calendar/event?eid=OXYxbzRuamhya2c3YTg2bm5kNGVzNTFpbTQgbHYzOTYzdWRjdHZvaDk0NGM3ZGxpazV0ZDRAZw",
        "created": "2016-02-10T13:30:13.000Z",
        "updated": "2016-02-10T13:30:23.118Z",
        "summary": "Бронь ГЭБ 6чел Алексанр",
        "creator": {
            "email": "blah@gmail.com",
            "displayName": "Blah Blah"
        },
        "organizer": {
            "email": "lv3963udctvoh944c7dlik5td4@group.calendar.google.com",
            "displayName": "Kocherga",
            "self": True,
        },
        "start": {
            "dateTime": "2016-02-10T19:00:00+03:00"
        },
        "end": {
            "dateTime": "2016-02-10T20:00:00+03:00"
        },
        "iCalUID": "9v1o4njhrkg7a86nnd4es51im4@google.com",
        "sequence": 0,
        "reminders": {
            "useDefault": True,
        }
    }

    def test_constructor(self):
        assert type(kocherga.events.booking.Booking(datetime.today(), datetime.today() + timedelta(hours=1), 'гэб')) == kocherga.events.booking.Booking

    def test_constructor_wrong_room(self):
        with pytest.raises(PublicError, match='Unknown room'):
            kocherga.events.booking.Booking(datetime.today(), datetime.today() + timedelta(hours=1), 'блаблабла')

    def test_from_event(self):
        booking = kocherga.events.booking.Booking.from_event(self.EVENT)
        assert booking.room == 'гэб'

    def test_public_object(self):
        booking = kocherga.events.booking.Booking.from_event(self.EVENT)
        o = booking.public_object()
        assert o['room'] == 'ГЭБ'
        assert o['start'] == "2016-02-10T19:00:00+03:00"
        assert o['end'] == "2016-02-10T20:00:00+03:00"


class TestDayBookings:
    def test_is_array(self):
        result = kocherga.events.booking.day_bookings(datetime.today())
        assert type(result) == type([])


class TestCheckAvailability:
    def test_no_params(self):
        with pytest.raises(TypeError):
            kocherga.events.booking.check_availability()

    def test_date_comparison(self):
        with pytest.raises(PublicError, match='Starting date and ending date should be equal.'):
            kocherga.events.booking.check_availability(datetime.today(), datetime.today() + timedelta(days=1), 'гэб')

    def test_normal(self):
        result = kocherga.events.booking.check_availability(datetime.today(), datetime.today(), 'гэб')
        assert result == True

    def test_unknown_room(self):
        with pytest.raises(PublicError, match='Unknown room blah.'):
            kocherga.events.booking.check_availability(datetime.today(), datetime.today(), 'blah')

class TestAddBooking:
    def test_no_params(self):
        with pytest.raises(TypeError):
            kocherga.events.booking.add_booking()

    def test_validate_people(self):
        with pytest.raises(PublicError, match='Invalid number of people'):
            kocherga.events.booking.add_booking('2017-01-01', 'гэб', '-5', '12:00', '12:30', 'somebody@example.com')

    def test_validate_people_number(self):
        with pytest.raises(PublicError, match='Invalid number of people'):
            kocherga.events.booking.add_booking('2017-01-01', 'гэб', -5, '12:00', '12:30', 'somebody@example.com')

    def test_validate_zero_people(self):
        with pytest.raises(PublicError, match='Zero people walk into a bar'):
            kocherga.events.booking.add_booking('2017-01-01', 'гэб', 0, '12:00', '12:30', 'somebody@example.com')

    def test_validate_room(self):
        with pytest.raises(PublicError, match='Unknown room'):
            kocherga.events.booking.add_booking('2017-01-01', 'blah', 3, '12:00', '12:30', 'somebody@example.com')

    def test_past_date(self):
        with pytest.raises(PublicError, match='The past is already gone'):
            kocherga.events.booking.add_booking('2017-01-01', 'гэб', 3, '12:00', '12:30', 'somebody@example.com')

    def test_add_booking(self):
        event = kocherga.events.booking.add_booking((datetime.today() + timedelta(days=1)).strftime('%Y-%m-%d'), 'гэб', 3, '12:00', '12:30', 'somebody@example.com')

        # cleanup
        result = kocherga.events.api().events().delete(
            calendarId=kocherga.events.CALENDAR,
            eventId=event['id'],
        ).execute()

        assert event['summary'] == 'Бронь ГЭБ, 3 человек, somebody@example.com'

    def test_add_booking_unknown(self):
        with pytest.raises(PublicError, match='Unknown room'):
            kocherga.events.booking.add_booking((datetime.today() + timedelta(days=1)).strftime('%Y-%m-%d'), 'unknown', 3, '12:00', '12:30', 'somebody@example.com')

    def test_add_booking_unknown2(self):
        with pytest.raises(PublicError, match='Unknown room'):
            kocherga.events.booking.add_booking((datetime.today() + timedelta(days=1)).strftime('%Y-%m-%d'), 'неизвестная', 3, '12:00', '12:30', 'somebody@example.com')

    def test_add_duplicate(self):
        event = kocherga.events.booking.add_booking((datetime.today() + timedelta(days=1)).strftime('%Y-%m-%d'), 'гэб', 3, '12:00', '12:30', 'somebody@example.com')
        with pytest.raises(PublicError, match='This room is not available at that time'):
            kocherga.events.booking.add_booking((datetime.today() + timedelta(days=1)).strftime('%Y-%m-%d'), 'гэб', 3, '12:00', '12:30', 'somebody@example.com')

        # cleanup
        result = kocherga.events.api().events().delete(
            calendarId=kocherga.events.CALENDAR,
            eventId=event['id'],
        ).execute()
