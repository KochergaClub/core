import pytest
pytestmark = pytest.mark.usefixtures('db')

import datetime
from freezegun import freeze_time

from django.core.management import call_command

import kocherga.watchmen.tools
import kocherga.watchmen.models


@pytest.fixture('session')
def django_db_setup(django_db_setup, django_db_blocker):

    with django_db_blocker.unblock():
        call_command('loaddata', 'tests/watchmen/fixtures.json')


@pytest.fixture
def schedule():
    return kocherga.watchmen.tools.load_schedule()


class TestSchedule:
    def test_load_schedule(self, schedule):
        assert type(schedule) == kocherga.watchmen.models.Schedule

    def test_shifts_by_date(self, schedule):
        by_date = schedule.shifts_by_date(datetime.date(2019, 3, 30))

        assert type(by_date) == dict
        assert by_date[kocherga.watchmen.models.ShiftType.MORNING] == 'Элиезер'

    def test_watchman_by_dt(self, schedule):
        watchman = schedule.watchman_by_dt(datetime.datetime(2019, 3, 30, hour=15, minute=0))

        assert watchman == 'Слава'

    def test_current_watchman(self, schedule):
        with freeze_time('2019-03-30 10:00'):
            assert schedule.current_watchman() == 'Элиезер'

    def test_last_watchman(self, schedule):
        with freeze_time('2019-03-31 01:00'):
            assert schedule.last_watchman() == 'Робин'

    def test_nearest_watchman(self, schedule):
        with freeze_time('2019-03-30 01:00'):
            assert schedule.nearest_watchman() == 'Элиезер'
