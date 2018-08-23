import pytest
pytestmark = pytest.mark.usefixtures('db')

from freezegun import freeze_time
from datetime import datetime, timedelta

@pytest.mark.asyncio
async def test_list(api_client):
    res = await api_client.get('/bookings/today')
    assert res.status_code == 200

@pytest.mark.asyncio
async def test_add(api_client, user_jwt_token):
    dt = datetime.now() + timedelta(days=3)

    res = await api_client.post(
        '/bookings',
        headers={
            'Authorization': 'JWT ' + user_jwt_token,
        },
        json={
            'date': dt.strftime('%Y-%m-%d'),
            'room': 'Летняя',
            'people': '3',
            'startTime': '18:00',
            'endTime': '19:00',
        }
    )
    assert res.status_code == 200
