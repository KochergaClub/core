import pytest

def test_options(client):
    res = client.options('/api/rooms')
    assert res.status_code == 200
    assert res.headers.get('Access-Control-Allow-Origin') == '*'
