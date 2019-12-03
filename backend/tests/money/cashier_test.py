import pytest
pytestmark = [
    pytest.mark.google,
]

from kocherga.money.cashier.models import current_cash
from kocherga.money.cashier.importer import Importer


def test_importer():
    Importer().import_new()


def test_current_cash(db):
    Importer().import_new()
    cc = current_cash()
    assert isinstance(cc, int)
    assert cc > 100
