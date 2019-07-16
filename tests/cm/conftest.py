import pytest

import kocherga.cm.auth


@pytest.fixture
def cm_auth():
    kocherga.cm.auth.update_cookies()
