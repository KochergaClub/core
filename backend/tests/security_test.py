import pytest

import kocherga.security


@pytest.mark.slack
def test_audit_slack():
    kocherga.security.audit_slack()
