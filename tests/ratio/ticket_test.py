import pytest
from kocherga.ratio.models import Training, Ticket

@pytest.fixture
def training():
    return Training(name='2035-01 воркшоп')

@pytest.fixture
def ticket(training):
    return Ticket(
        training=training,
        email='somebody@example.com',
    )

def test_uid(ticket):
    assert ticket.uid()
