import pytest
pytestmark = pytest.mark.django_db

import kocherga.security


@pytest.mark.slack
def test_audit_slack():
    kocherga.security.audit_slack()
