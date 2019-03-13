import pytest
from kocherga.ratio.models import Training, Ticket

import datetime


@pytest.fixture
def training_with_schedule():
    result = Training(name='2034-01 воркшоп')
    result.save()
    result.schedule.create(
        day=1,
        time=datetime.time(10, 0),
        activity_type='section',
        name='Какая-то секция',
    )
    result.schedule.create(
        day=1,
        time=datetime.time(12, 0),
        activity_type='section',
        name='Другая секция',
    )
    return result


@pytest.fixture
def training():
    result = Training(name='2035-01 воркшоп')
    result.save()
    return result


@pytest.fixture
def ticket(training):
    result = Ticket(
        training=training,
        email='somebody@example.com',
        payment_amount=15000,
        paid=True,
    )
    result.save()
    return result
