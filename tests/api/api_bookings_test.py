import pytest
pytestmark = pytest.mark.usefixtures('db')

import json

from freezegun import freeze_time
from datetime import datetime, timedelta

def test_list(client):
    res = client.get('/api/bookings/today')
    assert res.status_code == 200

def test_add(client, user_jwt_token):
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
        AUTHORIZATION='JWT ' + user_jwt_token,
    )
    assert res.status_code == 200
