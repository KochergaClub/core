import pytest
pytestmark = [
    pytest.mark.django_db,
    pytest.mark.google,
]

from kocherga.money.cashier.models import current_cash
from kocherga.money.cashier.importer import Importer


@pytest.mark.django_db(transaction=True)
def test_importer():
    Importer().import_new()


@pytest.mark.django_db(transaction=True)
def test_current_cash(db):
    Importer().import_new()
    cc = current_cash()
    assert isinstance(cc, int)
    assert cc > 100
