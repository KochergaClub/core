import pytest
pytestmark = pytest.mark.usefixtures('db')

from kocherga.ratio import models


def test_tickets_count_zero(training):
    assert training.tickets_count() == 0


def test_tickets_count(training, ticket):
    assert training.tickets_count() == 1


def test_total_income_zero(training):
    assert training.total_income() == 0


def test_total_income(training, ticket):
    assert training.total_income() == 15000


def test_trainer_income(training_with_schedule, trainer):
    models.Ticket.objects.create(
        training=training_with_schedule,
        email='somebody@example.com',
        payment_amount=15000,
        paid=True,
    )
    models.Ticket.objects.create(
        training=training_with_schedule,
        email='somebody2@example.com',
        payment_amount=20000,
        paid=True,
    )
    assert training_with_schedule.trainer_salary(trainer) == 15837.50


def test_copy_schedule_from(training, training_with_schedule):
    assert training.schedule.count() == 0
    training.copy_schedule_from(training_with_schedule)
    assert training.schedule.count() == 2
