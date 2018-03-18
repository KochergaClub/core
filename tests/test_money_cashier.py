import datetime

import kocherga.money.cashier

def test_export_to_db(db):
    kocherga.money.cashier.export_to_db()
