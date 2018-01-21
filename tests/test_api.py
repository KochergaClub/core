from datetime import datetime
import json

def test_events(api_client):
    res = api_client.get('/events')
    assert res.status_code == 200
    events = res.json

    assert len(events) > 5

    assert '2017' in events[0]['start']['dateTime']

def test_events_from_date(api_client):
    res = api_client.get('/events?from_date=2018-01-01&to_date=2018-01-14')
    assert res.status_code == 200
    events = res.json

    assert len(events) > 5

    assert '2018' in events[0]['start']['dateTime']

def test_bookings(api_client):
    res = api_client.get('/bookings/today')
    assert res.status_code == 200

def test_rooms(api_client):
    res = api_client.get('/rooms')
    assert res.status_code == 200
    assert len(res.json) == 4
    assert type(res.json[0]) == dict
