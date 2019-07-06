import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
]

from kocherga.cashier.models import Payment


def test_payments(admin_client):
    res = admin_client.get('/api/cashier/payment')
    assert res.status_code == 200
