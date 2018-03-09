from datetime import datetime
import json

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

@pytest.mark.asyncio
async def test_bookings(api_client):
    res = await api_client.get('/bookings/today')
    assert res.status_code == 200

@pytest.mark.asyncio
async def test_rooms(api_client):
    res = await api_client.get('/rooms')
    assert res.status_code == 200
    rooms = await res.get_json()
    assert len(rooms) == 4
    assert type(rooms[0]) == dict

@pytest.mark.asyncio
async def test_now(api_client):
    res = await api_client.get('/people/now')
    assert res.status_code == 200
    now = await res.get_json()
    assert type(now['now']), int

@pytest.mark.asyncio
async def test_templater(api_client):
    res = await api_client.get('/templater/html/mailchimp?start_date=2017-03-01&end_date=2017-03-08')
    assert res.status_code == 200

@pytest.mark.asyncio
async def test_options(api_client):
    res = await api_client.options('/rooms')
    assert res.status_code == 200
    assert res.headers.get('Access-Control-Allow-Origin') == '*'
