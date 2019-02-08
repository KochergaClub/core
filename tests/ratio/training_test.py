import pytest
pytestmark = pytest.mark.usefixtures('db')

def test_tickets_count_zero(training):
    assert training.tickets_count() == 0

def test_tickets_count(training, ticket):
    assert training.tickets_count() == 1
