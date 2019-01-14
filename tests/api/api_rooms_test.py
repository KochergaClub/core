import pytest

def test_rooms(client):
    res = client.get('/api/rooms')
    assert res.status_code == 200
    rooms = res.json()
    assert len(rooms) == 4
    assert type(rooms[0]) == dict
