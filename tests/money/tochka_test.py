from datetime import date

import kocherga.money.tochka

# FIXME: for this test to pass, tokens file should be initialized manually (with `kocherga.money.tochka.init_tokens()` method).

def test_update_tokens():
    kocherga.money.tochka.update_tokens()
    (_, account_id) = kocherga.money.tochka.get_account_info()
    assert account_id
    assert isinstance(account_id, str)

def test_account_info():
    (account_id, bank_code) = kocherga.money.tochka.get_account_info()
    assert isinstance(account_id, str)
    assert isinstance(bank_code, str)

def test_get_statements():
    statements = list(kocherga.money.tochka.get_statements(date(2018,12,1), date(2018,12,31)))
    assert len(statements) > 10
    assert isinstance(statements[0], kocherga.money.tochka.Record)
