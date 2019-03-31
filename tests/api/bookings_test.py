import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
    pytest.mark.google,  # events require google for now (don't forget to remove this later)
]

import json

from datetime import datetime, timedelta


def test_list(client):
    res = client.get('/api/bookings/today')
    assert res.status_code == 200

def test_add(client, user_auth_header):
    dt = datetime.now() + timedelta(days=3)

    res = client.post(
        '/api/bookings',
        json.dumps({
            'date': dt.strftime('%Y-%m-%d'),
            'room': 'Летняя',
            'people': '3',
            'startTime': '18:00',
            'endTime': '19:00',
        }),
        content_type='application/json',
        **user_auth_header,
    )
    assert res.status_code == 200
