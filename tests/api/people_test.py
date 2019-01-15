import pytest
pytestmark = pytest.mark.usefixtures('db')

def test_now(client):
    res = client.get('/api/people/now')
    assert res.status_code == 200
    now = res.json()
    assert type(now['total']) == int
