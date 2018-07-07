import kocherga.security

def test_audit_slack():
    assert kocherga.security.audit_slack() >= 1
