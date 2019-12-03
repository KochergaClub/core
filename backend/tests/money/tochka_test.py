import pytest
pytestmark = pytest.mark.skip("we keep tochka tokens in DB, so there's no way to test this")

from datetime import date

import kocherga.money.tochka.api as t

# FIXME: for this test to pass, tokens file should be initialized manually
# (with `kocherga.money.tochka.init_tokens()` method).


def test_update_tokens():
    t.update_tokens()
    (_, account_id) = t.get_account_info()
    assert account_id
    assert isinstance(account_id, str)


def test_account_info():
    (account_id, bank_code) = t.get_account_info()
    assert isinstance(account_id, str)
    assert isinstance(bank_code, str)


def test_get_statements():
    statements = list(t.get_statements(date(2018, 12, 1), date(2018, 12, 31)))
    assert len(statements) > 10
    assert isinstance(statements[0], t.Record)
