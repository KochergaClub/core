from datetime import datetime
import json

def test_events(client):
    res = client.get('/events')
    assert res.status_code == 200
    events = res.json

    assert len(events) > 5

    assert '2015' in events[0]['start']['dateTime']

def test_events_from_date(client):
    res = client.get('/events?from_date=2017-12-01&to_date=2017-12-14')
    assert res.status_code == 200
    events = res.json

    assert len(events) > 5

    assert '2017' in events[0]['start']['dateTime']

def test_bookings(client):
    res = client.get('/bookings/today')
    assert res.status_code == 200

def test_rooms(client):
    res = client.get('/rooms')
    assert res.status_code == 200
    assert len(res.json) == 4
    assert type(res.json[0]) == dict
