# legacy, see schema_test.py instead
def test_me_not_authenticated(client):
    res = client.get('/api/me')
    assert res.status_code == 200
    assert res.json()['is_authenticated'] is False
