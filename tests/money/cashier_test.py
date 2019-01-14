import pytest

import datetime

from kocherga.money.cashier.models import export_to_db, current_cash

@pytest.mark.django_db()
def test_export_to_db(db):
    export_to_db()

@pytest.mark.django_db()
def test_current_cash(db):
    export_to_db()
    cc = current_cash()
    assert isinstance(cc, int)
    assert cc > 100
