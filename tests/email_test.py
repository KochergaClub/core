import pytest
pytestmark = pytest.mark.usefixtures('db')

import kocherga.email.weekly_digest

def test_digest_draft():
    kocherga.email.weekly_digest.create_draft()
