import pytest

@pytest.mark.asyncio
async def test_events(api_client):
    res = await api_client.get('/events')
    assert res.status_code == 200
    events = await res.get_json()

    assert len(events) > 5

    assert '2017' in events[0]['start']['dateTime']

@pytest.mark.asyncio
async def test_events_from_date(api_client):
    res = await api_client.get('/events?from_date=2018-01-01&to_date=2018-01-14')
    assert res.status_code == 200
    events = await res.get_json()

    assert len(events) > 5

    assert '2018' in events[0]['start']['dateTime']
