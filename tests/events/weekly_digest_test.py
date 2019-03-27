import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
    pytest.mark.mailchimp,
]

import kocherga.events.weekly_digest


def test_digest_draft():
    kocherga.events.weekly_digest.create_draft()
