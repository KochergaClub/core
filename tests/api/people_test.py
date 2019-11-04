import pytest

import kocherga.cm.auth


@pytest.fixture
def cm_auth():
    kocherga.cm.auth.update_cookies()


def test_now(client, cm_auth):
    res = client.get('/api/people/now')
    assert res.status_code == 200
    now = res.json()
    assert type(now['total']) == int
