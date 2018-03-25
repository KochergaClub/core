import datetime

import kocherga.money.cashier

def test_export_to_db(db):
    kocherga.money.cashier.export_to_db()

def test_current_cash(db):
    kocherga.money.cashier.export_to_db()
    cc = kocherga.money.cashier.current_cash()
    assert isinstance(cc, int)
    assert cc > 100
