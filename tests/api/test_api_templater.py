import pytest

@pytest.mark.asyncio
async def test_templater(api_client):
    res = await api_client.get('/templater/html/mailchimp?start_date=2017-03-01&end_date=2017-03-08')
    assert res.status_code == 200
