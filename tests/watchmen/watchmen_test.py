import pytest

import datetime
from freezegun import freeze_time

from django.core.management import call_command

from kocherga.watchmen import schedule
import kocherga.watchmen.models


@pytest.fixture('session')
def django_db_setup(django_db_setup, django_db_blocker):

    with django_db_blocker.unblock():
        call_command('loaddata', 'tests/watchmen/staff-fixtures.json')
        call_command('loaddata', 'tests/watchmen/fixtures.json')


class TestSchedule:
    def test_shifts_by_date(self):
        by_date = schedule.shifts_by_date(datetime.date(2019, 3, 30))

        assert type(by_date) == dict
        assert by_date[kocherga.watchmen.models.ShiftType.MORNING].watchman.member.short_name == 'Элиезер'

    def test_shifts_by_empty_date(self):
        by_date = schedule.shifts_by_date(datetime.date(2018, 1, 1))

        assert type(by_date) == dict
        assert len(by_date) == 4

    def test_shift_by_dt(self):
        shift = schedule.shift_by_dt(datetime.datetime(2019, 3, 30, hour=15, minute=0))

        assert shift.watchman.member.short_name == 'Слава'

    def test_current_shift(self):
        with freeze_time('2019-03-30 10:00'):
            assert schedule.current_shift().watchman.member.short_name == 'Элиезер'

    def test_last_watchman(self):
        with freeze_time('2019-03-31 01:00'):
            assert schedule.last_watchman().member.short_name == 'Робин'

    def test_nearest_watchman(self):
        with freeze_time('2019-03-30 01:00'):
            assert schedule.nearest_watchman().member.short_name == 'Элиезер'
