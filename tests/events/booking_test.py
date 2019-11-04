import pytest

from datetime import datetime, timedelta

from kocherga.events.booking import Booking, add_booking, delete_booking, day_bookings, check_availability
from kocherga.events.models import Event, GoogleCalendar
from kocherga.error import PublicError
from kocherga.dateutils import TZ


@pytest.fixture
def event1():
    return Event.objects.create(
        title="Бронь ГЭБ 6чел Алексанр",
        start=datetime(2016, 2, 10, 19, tzinfo=TZ),
        end=datetime(2016, 2, 10, 20, tzinfo=TZ),
    )


class TestBooking:
    def test_constructor(self):
        booking = Booking(datetime.now(TZ), datetime.now(TZ) + timedelta(hours=1), 'гэб', 5)
        assert type(booking) == Booking

    def test_constructor_wrong_room(self):
        with pytest.raises(PublicError, match='Unknown room'):
            Booking(datetime.now(TZ), datetime.now(TZ) + timedelta(hours=1), 'блаблабла', 5)

    def test_from_event(self, event1):
        booking = Booking.from_event(event1)
        assert booking.room == 'гэб'

    def test_public_object(self, event1):
        booking = Booking.from_event(event1)
        o = booking.public_object()
        assert o['room'] == 'ГЭБ'
        assert o['start'] == "2016-02-10T19:00:00+03:00"
        assert o['end'] == "2016-02-10T20:00:00+03:00"


class TestDayBookings:
    def test_empty(self):
        result = day_bookings(datetime.now(TZ))
        assert type(result) == list

    def test_returns_all(self):
        d = datetime.now(TZ) + timedelta(days=1)
        add_booking(
            d.strftime('%Y-%m-%d'),
            'гэб', 3,
            '12:00', '12:30',
            'first@example.com'
        )
        add_booking(
            d.strftime('%Y-%m-%d'),
            'гэб', 3,
            '13:00', '13:30',
            'second@example.com'
        )
        add_booking(
            (d + timedelta(days=1)).strftime('%Y-%m-%d'),
            'гэб', 3,
            '13:00', '13:30',
            'other@example.com'
        )
        result = day_bookings(d)
        assert len(result) == 2


class TestCheckAvailability:
    def test_no_params(self):
        with pytest.raises(TypeError):
            check_availability()

    def test_date_comparison(self):
        with pytest.raises(PublicError, match='Starting date and ending date should be equal.'):
            check_availability(datetime.now(TZ), datetime.now(TZ) + timedelta(days=1), 'гэб')

    def test_normal(self):
        result = check_availability(
            datetime.now(TZ).replace(hour=18),
            datetime.now(TZ).replace(hour=19),
            'гэб'
        )
        assert result is True

    def test_unknown_room(self):
        with pytest.raises(PublicError, match='Unknown room blah.'):
            check_availability(
                datetime.now(TZ).replace(hour=18),
                datetime.now(TZ).replace(hour=19),
                'blah'
            )


class TestAddBooking:
    def test_no_params(self):
        with pytest.raises(TypeError):
            add_booking()

    def test_validate_people(self):
        with pytest.raises(PublicError, match='Invalid number of people'):
            add_booking('2017-01-01', 'гэб', '-5', '12:00', '12:30', 'somebody@example.com')

    def test_validate_people_number(self):
        with pytest.raises(PublicError, match='Invalid number of people'):
            add_booking('2017-01-01', 'гэб', -5, '12:00', '12:30', 'somebody@example.com')

    def test_validate_zero_people(self):
        with pytest.raises(PublicError, match='Zero people walk into a bar'):
            add_booking('2017-01-01', 'гэб', 0, '12:00', '12:30', 'somebody@example.com')

    def test_validate_room(self):
        with pytest.raises(PublicError, match='Unknown room'):
            add_booking('2017-01-01', 'blah', 3, '12:00', '12:30', 'somebody@example.com')

    def test_past_date(self):
        with pytest.raises(PublicError, match='The past is already gone'):
            add_booking('2017-01-01', 'гэб', 3, '12:00', '12:30', 'somebody@example.com')

    def test_too_far_date(self):
        with pytest.raises(PublicError, match='too far'):
            add_booking('2025-01-01', 'гэб', 3, '12:00', '12:30', 'somebody@example.com')

    def test_add_booking(self):
        event = add_booking(
            (datetime.now(TZ) + timedelta(days=1)).strftime('%Y-%m-%d'),
            'гэб', 3,
            '12:00', '12:30',
            'somebody@example.com'
        )

        assert event.title == 'Бронь ГЭБ, 3 человек, somebody@example.com'
        assert event.location == 'ГЭБ'
        assert event.event_type == 'private'
        assert event.start.hour == 12  # correct timezone
        assert event.creator == 'somebody@example.com'

    def test_add_booking_midnight(self):
        event = add_booking(
            (datetime.now(TZ) + timedelta(days=1)).strftime('%Y-%m-%d'),
            'гэб', 3,
            '23:00', '24:00',
            'somebody@example.com'
        )

        assert event.title == 'Бронь ГЭБ, 3 человек, somebody@example.com'

    def test_add_booking_back_to_back(self):
        event1 = add_booking(
            (datetime.now(TZ) + timedelta(days=1)).strftime('%Y-%m-%d'),
            'гэб', 3,
            '09:00', '09:30',
            'somebody1@example.com'
        )
        event2 = add_booking(
            (datetime.now(TZ) + timedelta(days=1)).strftime('%Y-%m-%d'),
            'гэб', 3,
            '09:30', '10:00',
            'somebody2@example.com'
        )

        assert event1.title == 'Бронь ГЭБ, 3 человек, somebody1@example.com'
        assert event2.title == 'Бронь ГЭБ, 3 человек, somebody2@example.com'

    def test_add_booking_unknown(self):
        with pytest.raises(PublicError, match='Unknown room'):
            add_booking(
                (datetime.now(TZ) + timedelta(days=1)).strftime('%Y-%m-%d'),
                'unknown', 3,
                '12:00', '12:30',
                'somebody@example.com'
            )

    def test_add_booking_unknown2(self):
        with pytest.raises(PublicError, match='Unknown room'):
            add_booking(
                (datetime.now(TZ) + timedelta(days=1)).strftime('%Y-%m-%d'),
                'неизвестная', 3,
                '12:00', '12:30',
                'somebody@example.com'
            )

    def test_add_duplicate(self):
        add_booking(
            (datetime.now(TZ) + timedelta(days=1)).strftime('%Y-%m-%d'),
            'гэб', 3,
            '12:00', '12:30',
            'somebody@example.com'
        )
        with pytest.raises(PublicError, match='This room is not available at that time'):
            add_booking(
                (datetime.now(TZ) + timedelta(days=1)).strftime('%Y-%m-%d'),
                'гэб', 3,
                '12:00', '12:30',
                'somebody@example.com'
            )


class TestDeleteBooking:
    def test_delete_booking_unknown(self):
        with pytest.raises(Event.DoesNotExist):
            delete_booking('blahblah', 'somebody@example.com')

    def test_delete_booking(self):
        event = add_booking(
            (datetime.now(TZ) + timedelta(days=1)).strftime('%Y-%m-%d'),
            'гэб', 3,
            '12:00', '12:30',
            'somebody@example.com'
        )

        delete_booking(event.uuid, 'somebody@example.com')

    def test_delete_booking_access(self):
        event = add_booking(
            (datetime.now(TZ) + timedelta(days=1)).strftime('%Y-%m-%d'),
            'гэб', 3,
            '12:00', '12:30',
            'somebody@example.com'
        )

        with pytest.raises(PublicError, match='Access denied'):
            delete_booking(event.uuid, 'hacker@example.com')

    def test_delete_booking_prefix_access(self):
        event = add_booking(
            (datetime.now(TZ) + timedelta(days=1)).strftime('%Y-%m-%d'),
            'гэб', 3,
            '12:00', '12:30',
            'somebody@example.com'
        )

        with pytest.raises(PublicError, match='Access denied'):
            delete_booking(event.uuid, 'hack-somebody@example.com')


@pytest.mark.google
def test_google_export(test_google_calendar_id):
    event = add_booking(
        (datetime.now(TZ) + timedelta(days=1)).strftime('%Y-%m-%d'),
        'гэб', 3,
        '12:00', '12:30',
        'somebody@example.com'
    )

    google_calendar = GoogleCalendar.objects.create(
        calendar_id=test_google_calendar_id,
        public_only=False,
    )
    google_calendar.export_event(event)

    google_event = google_calendar.google_events.get(event=event)
    google_data = google_event.load_google_data()
    attendees = google_data['attendees']
    assert len(attendees) == 1
    assert attendees[0]['email'] == 'somebody@example.com'
    assert google_data['location'] == 'Кочерга, комната ГЭБ'
    assert event.location == 'ГЭБ'
