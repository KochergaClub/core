import pytest
from kocherga.ratio.models import Training, Ticket

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
