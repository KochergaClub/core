import pytest
pytestmark = pytest.mark.usefixtures('db')

@pytest.mark.asyncio
async def test_templater(api_client):
    res = await api_client.get(
        '/templater/html/mailchimp',
        query_string={'start_date': '2017-03-01', 'end_date': '2017-03-08'},
        headers={'Host': 'http://example.com'}
    )
    assert res.status_code == 200
