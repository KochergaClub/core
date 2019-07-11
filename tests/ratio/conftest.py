import pytest
from django.contrib.auth import get_user_model

from kocherga.ratio.models import Training, Ticket, Trainer

import datetime


@pytest.fixture
def training_with_schedule(trainer):
    result = Training(name='2034-01 воркшоп', slug='w1')
    result.save()
    result.schedule.create(
        day=1,
        time=datetime.time(10, 0),
        activity_type='section',
        name='Какая-то секция',
        trainer=trainer,
    )
    result.schedule.create(
        day=1,
        time=datetime.time(12, 0),
        activity_type='section',
        name='Другая секция',
        trainer=trainer,
    )
    return result


@pytest.fixture
def training():
    result = Training(name='2035-01 воркшоп', slug='w2')
    result.save()
    return result


@pytest.fixture
def trainer():
    user = get_user_model().objects.create_user(email='trainer1@example.com')
    return Trainer.objects.create(
        short_name='abc',
        user=user,
    )


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
