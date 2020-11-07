from kocherga.ratio import models
from kocherga.money.cashier.models import Payment


def test_tickets_count_zero(training):
    assert training.tickets_count() == 0


def test_tickets_count(training, ticket):
    assert training.tickets_count() == 1


def test_total_income_zero(training):
    assert training.total_income() == 0


def test_total_income(training, ticket):
    assert training.total_income() == 15000


def test_trainer_income(training_with_schedule, trainer):
    t = training_with_schedule

    models.Ticket.objects.create(
        training=t,
        first_name='foo',
        email='somebody@example.com',
        payment_amount=15000,
    )
    models.Ticket.objects.create(
        training=t,
        first_name='foo',
        email='somebody2@example.com',
        payment_amount=20000,
    )
    assert t.trainer_salary(trainer) == 15837.50

    assert t.salaries_paid is False
    t.pay_salaries()
    assert t.salaries_paid is True
    assert len(Payment.objects.all()) == 1


def test_copy_schedule_from(training, training_with_schedule):
    assert len(list(training.all_activities())) == 0
    training.copy_schedule_from(training_with_schedule)
    assert len(list(training.all_activities())) == 2
