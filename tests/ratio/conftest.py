import pytest
from django.contrib.auth import get_user_model

from kocherga.ratio import models

import datetime


@pytest.fixture
def training_with_schedule(trainer):
    result = models.Training(
        name='2034-01 воркшоп',
        slug='w1',
        date=datetime.date(2035, 1, 1),
    )
    result.save()
    day = result.days.create(
        date=datetime.date(2035, 1, 1),
    )
    day.schedule.create(
        time=datetime.time(10, 0),
        activity_type='section',
        name='Какая-то секция',
        trainer=trainer,
    )
    day.schedule.create(
        time=datetime.time(12, 0),
        activity_type='section',
        name='Другая секция',
        trainer=trainer,
    )
    return result


@pytest.fixture
def training():
    result = models.Training(
        name='2035-01 воркшоп',
        slug='w2',
        date=datetime.date(2035, 1, 1),
    )
    result.save()
    return result


@pytest.fixture
def trainer():
    user = get_user_model().objects.create_user(email='trainer1@example.com')
    return models.Trainer.objects.create(
        short_name='abc',
        user=user,
    )


@pytest.fixture
def ticket(training):
    result = models.Ticket(
        training=training,
        email='somebody@example.com',
        payment_amount=15000,
        paid=True,
    )
    result.save()
    return result
