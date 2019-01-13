import pytest

def test_options(client):
    res = client.options('/api/rooms')
    assert res.status_code == 200
    assert res.headers.get('Access-Control-Allow-Origin') == '*'

def test_exceptions(client):
    res = client.options('/api/nosuchroute')
    assert res.status_code == 404
