import pytest
pytestmark = pytest.mark.usefixtures('db')

@pytest.mark.asyncio
async def test_timepad_categories(api_client):
    res = await api_client.get('/announcements/timepad/categories')
    assert res.status_code == 200
    categories = await res.get_json()

    assert len(categories) > 5
