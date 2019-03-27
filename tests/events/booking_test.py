import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
    pytest.mark.google,
]

from datetime import datetime, timedelta

import kocherga.events.booking
import kocherga.events.google
from kocherga.events.models import Event
from kocherga.error import PublicError
from kocherga.dateutils import TZ



@pytest.fixture
def event1():
    GOOGLE_EVENT = {
        "kind": "calendar#event",
        "etag": "\"2910222046236000\"",
        "id": "9v1o4njhrkg7a86nnd4es51im4",
        "status": "confirmed",
        "htmlLink": (
            "https://www.google.com/calendar/event?eid="
            "OXYxbzRuamhya2c3YTg2bm5kNGVzNTFpbTQgbHYzOTYzdWRjdHZvaDk0NGM3ZGxpazV0ZDRAZw"
        ),
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

    return Event.from_google(GOOGLE_EVENT)


class TestBooking:
    def test_constructor(self):
        booking = kocherga.events.booking.Booking(datetime.now(TZ), datetime.now(TZ) + timedelta(hours=1), 'гэб', 5)
        assert type(booking) == kocherga.events.booking.Booking

    def test_constructor_wrong_room(self):
        with pytest.raises(PublicError, match='Unknown room'):
            kocherga.events.booking.Booking(datetime.now(TZ), datetime.now(TZ) + timedelta(hours=1), 'блаблабла', 5)

    def test_from_event(self, event1):
        booking = kocherga.events.booking.Booking.from_event(event1)
        assert booking.room == 'гэб'

    def test_public_object(self, event1):
        booking = kocherga.events.booking.Booking.from_event(event1)
        o = booking.public_object()
        assert o['room'] == 'ГЭБ'
        assert o['start'] == "2016-02-10T19:00:00+03:00"
        assert o['end'] == "2016-02-10T20:00:00+03:00"


class TestDayBookings:
    def test_is_array(self, imported_events):
        result = kocherga.events.booking.day_bookings(datetime.now(TZ))
        assert type(result) == list


class TestCheckAvailability:
    def test_no_params(self):
        with pytest.raises(TypeError):
            kocherga.events.booking.check_availability()

    def test_date_comparison(self):
        with pytest.raises(PublicError, match='Starting date and ending date should be equal.'):
            kocherga.events.booking.check_availability(datetime.now(TZ), datetime.now(TZ) + timedelta(days=1), 'гэб')

    def test_normal(self):
        result = kocherga.events.booking.check_availability(
            datetime.now(TZ).replace(hour=18),
            datetime.now(TZ).replace(hour=19),
            'гэб'
        )
        assert result is True

    def test_unknown_room(self):
        with pytest.raises(PublicError, match='Unknown room blah.'):
            kocherga.events.booking.check_availability(
                datetime.now(TZ).replace(hour=18),
                datetime.now(TZ).replace(hour=19),
                'blah'
            )


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

    def test_too_far_date(self):
        with pytest.raises(PublicError, match='too far'):
            kocherga.events.booking.add_booking('2020-01-01', 'гэб', 3, '12:00', '12:30', 'somebody@example.com')

    def test_add_booking(self):
        event = kocherga.events.booking.add_booking(
            (datetime.now(TZ) + timedelta(days=1)).strftime('%Y-%m-%d'),
            'гэб', 3,
            '12:00', '12:30',
            'somebody@example.com'
        )

        # cleanup
        kocherga.events.db.delete_event(event.google_id)

        assert event.title == 'Бронь ГЭБ, 3 человек, somebody@example.com'
        assert event.location == 'Антикафе Кочерга, комната ГЭБ'
        assert event.event_type == 'private'

    def test_add_booking_midnight(self):
        event = kocherga.events.booking.add_booking(
            (datetime.now(TZ) + timedelta(days=1)).strftime('%Y-%m-%d'),
            'гэб', 3,
            '23:00', '24:00',
            'somebody@example.com'
        )

        # cleanup
        kocherga.events.db.delete_event(event.google_id)

        assert event.title == 'Бронь ГЭБ, 3 человек, somebody@example.com'

    def test_add_booking_back_to_back(self):
        event1 = kocherga.events.booking.add_booking(
            (datetime.now(TZ) + timedelta(days=1)).strftime('%Y-%m-%d'),
            'гэб', 3,
            '09:00', '09:30',
            'somebody1@example.com'
        )
        event2 = kocherga.events.booking.add_booking(
            (datetime.now(TZ) + timedelta(days=1)).strftime('%Y-%m-%d'),
            'гэб', 3,
            '09:30', '10:00',
            'somebody2@example.com'
        )

        assert event1.title == 'Бронь ГЭБ, 3 человек, somebody1@example.com'
        assert event2.title == 'Бронь ГЭБ, 3 человек, somebody2@example.com'

        # cleanup
        for event in (event1, event2):
            kocherga.events.db.delete_event(event.google_id)

    def test_add_booking_unknown(self):
        with pytest.raises(PublicError, match='Unknown room'):
            kocherga.events.booking.add_booking(
                (datetime.now(TZ) + timedelta(days=1)).strftime('%Y-%m-%d'),
                'unknown', 3,
                '12:00', '12:30',
                'somebody@example.com'
            )

    def test_add_booking_unknown2(self):
        with pytest.raises(PublicError, match='Unknown room'):
            kocherga.events.booking.add_booking(
                (datetime.now(TZ) + timedelta(days=1)).strftime('%Y-%m-%d'),
                'неизвестная', 3,
                '12:00', '12:30',
                'somebody@example.com'
            )

    def test_add_duplicate(self):
        event = kocherga.events.booking.add_booking((datetime.now(TZ) + timedelta(days=1)).strftime('%Y-%m-%d'), 'гэб', 3, '12:00', '12:30', 'somebody@example.com')
        with pytest.raises(PublicError, match='This room is not available at that time'):
            kocherga.events.booking.add_booking((datetime.now(TZ) + timedelta(days=1)).strftime('%Y-%m-%d'), 'гэб', 3, '12:00', '12:30', 'somebody@example.com')

        # cleanup
        kocherga.events.db.delete_event(event.google_id)


class TestDeleteBooking:
    def test_delete_booking_unknown(self):
        with pytest.raises(Event.DoesNotExist):
            kocherga.events.booking.delete_booking('blahblah', 'somebody@example.com')

    def test_delete_booking(self):
        event = kocherga.events.booking.add_booking((datetime.now(TZ) + timedelta(days=1)).strftime('%Y-%m-%d'), 'гэб', 3, '12:00', '12:30', 'somebody@example.com')

        kocherga.events.booking.delete_booking(event.google_id, 'somebody@example.com')

    def test_delete_booking_access(self):
        event = kocherga.events.booking.add_booking((datetime.now(TZ) + timedelta(days=1)).strftime('%Y-%m-%d'), 'гэб', 3, '12:00', '12:30', 'somebody@example.com')

        with pytest.raises(PublicError, match='Access denied'):
            kocherga.events.booking.delete_booking(event.google_id, 'hacker@example.com')

        # cleanup
        kocherga.events.booking.delete_booking(event.google_id, 'somebody@example.com')

    def test_delete_booking_prefix_access(self):
        event = kocherga.events.booking.add_booking((datetime.now(TZ) + timedelta(days=1)).strftime('%Y-%m-%d'), 'гэб', 3, '12:00', '12:30', 'somebody@example.com')

        with pytest.raises(PublicError, match='Access denied'):
            kocherga.events.booking.delete_booking(event.google_id, 'hack-somebody@example.com')

        # cleanup
        kocherga.events.booking.delete_booking(event.google_id, 'somebody@example.com')
