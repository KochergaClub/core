import pytest

@pytest.mark.asyncio
async def test_rooms(api_client):
    res = await api_client.get('/rooms')
    assert res.status_code == 200
    rooms = await res.get_json()
    assert len(rooms) == 4
    assert type(rooms[0]) == dict
