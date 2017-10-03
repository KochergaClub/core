def test_events(client):
    res = client.get('/events')
    assert res.status_code == 200

def test_bookings(client):
    res = client.get('/bookings/today')
    assert res.status_code == 200

def test_rooms(client):
    res = client.get('/rooms')
    assert res.status_code == 200
