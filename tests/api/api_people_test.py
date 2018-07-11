import pytest

@pytest.mark.asyncio
async def test_now(api_client):
    res = await api_client.get('/people/now')
    assert res.status_code == 200
    now = await res.get_json()
    assert type(now['now']), int
    assert type(now['total']), int
