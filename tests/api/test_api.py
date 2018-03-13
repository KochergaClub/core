import pytest

@pytest.mark.asyncio
async def test_options(api_client):
    res = await api_client.options('/rooms')
    assert res.status_code == 200
    assert res.headers.get('Access-Control-Allow-Origin') == '*'
