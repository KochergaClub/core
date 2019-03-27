import pytest
pytestmark = [
    pytest.mark.django_db,
    pytest.mark.google,
]

from kocherga.money.cashier.models import export_to_db, current_cash


def test_export_to_db(db):
    export_to_db()


def test_current_cash(db):
    export_to_db()
    cc = current_cash()
    assert isinstance(cc, int)
    assert cc > 100
