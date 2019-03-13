import pytest
pytestmark = pytest.mark.usefixtures('db')


def test_tickets_count_zero(training):
    assert training.tickets_count() == 0


def test_tickets_count(training, ticket):
    assert training.tickets_count() == 1


def test_total_income_zero(training):
    assert training.total_income() == 0


def test_total_income(training, ticket):
    assert training.total_income() == 15000


def test_copy_schedule_from(training, training_with_schedule):
    assert training.schedule.count() == 0
    training.copy_schedule_from(training_with_schedule)
    assert training.schedule.count() == 2
