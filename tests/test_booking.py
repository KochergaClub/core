import pytest
import kocherga.events.booking
from kocherga.common import PublicError
from datetime import datetime, timedelta

class TestCheckAvailability:
    def test_no_params(self):
        with pytest.raises(TypeError):
            kocherga.events.booking.check_availability()

    def test_date_comparison(self):
        with pytest.raises(PublicError, match='Starting date and ending date should be equal.'):
            kocherga.events.booking.check_availability(datetime.today(), datetime.today() + timedelta(days=1), 'гэб')

    def test_normal(self):
        result = kocherga.events.booking.check_availability(datetime.today(), datetime.today(), 'гэб')
        assert result, True

    def test_unknown_room(self):
        with pytest.raises(PublicError, match='Unknown room blah.'):
            kocherga.events.booking.check_availability(datetime.today(), datetime.today(), 'blah')

class TestAddBooking:
    def test_no_params(self):
        with pytest.raises(TypeError):
            kocherga.events.booking.add_booking()
