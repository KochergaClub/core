import pytest

import datetime
from freezegun import freeze_time

import kocherga.watchmen.tools
import kocherga.watchmen.models

@pytest.fixture(scope='class')
def google_schedule():
    return kocherga.watchmen.tools.load_schedule_from_google()

@pytest.fixture(scope='class')
def db_schedule():
    session = kocherga.db.Session()
    kocherga.watchmen.tools.load_schedule_from_google().save_to_db(session)
    session.commit()
    return kocherga.watchmen.tools.load_schedule_from_db()

@pytest.fixture(scope='class', params=['google', 'db'])
def schedule(request, google_schedule, db_schedule):
    if request.param == 'google':
        return google_schedule
    else:
        return db_schedule

class TestSchedule:
    def test_load_schedule(self, schedule):
        assert type(schedule), kocherga.watchmen.models.Schedule

    def test_shifts_by_date(self, schedule):
        by_date = schedule.shifts_by_date(datetime.date(2017, 12, 18))

        assert type(by_date), dict
        assert by_date[kocherga.watchmen.models.Shift.MORNING], 'Элиезер'

    def test_watchman_by_dt(self, schedule):
        watchman = schedule.watchman_by_dt(datetime.datetime(2017, 12, 18, hour=15, minute=0))

        assert watchman, 'Скотт'

    def test_save_to_db(self, db, schedule):
        watchman = schedule.save_to_db(kocherga.db.Session())

    def test_current_watchman(self, schedule):
        with freeze_time('2017-12-20 10:00'):
            assert schedule.current_watchman() == 'Элиезер'

    def test_last_watchman(self, schedule):
        with freeze_time('2017-12-20 01:00'):
            assert schedule.last_watchman() == 'Слава'

    def test_nearest_watchman(self, schedule):
        with freeze_time('2017-12-20 01:00'):
            assert schedule.nearest_watchman() == 'Элиезер'
