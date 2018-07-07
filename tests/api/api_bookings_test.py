import pytest
pytestmark = pytest.mark.usefixtures('db')

@pytest.mark.asyncio
async def test_bookings(api_client):
    res = await api_client.get('/bookings/today')
    assert res.status_code == 200
