import pytest
pytestmark = pytest.mark.usefixtures('db')

@pytest.mark.asyncio
async def test_html(api_client):
    res = await api_client.get(
        '/templater/mailchimp/html',
        query_string={'start_date': '2017-03-01', 'end_date': '2017-03-08'},
        headers={'Host': 'http://example.com'}
    )
    assert res.status_code == 200


@pytest.mark.asyncio
async def test_list(api_client):
    res = await api_client.get(
        '/templater',
        query_string={'start_date': '2017-03-01', 'end_date': '2017-03-08'},
        headers={'Host': 'http://example.com'}
    )
    assert res.status_code == 200
    data = await res.get_json()
    assert type(data) == list
