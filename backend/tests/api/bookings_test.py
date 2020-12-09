from datetime import datetime, timedelta

import pytest


@pytest.fixture
def dt():
    return datetime.now() + timedelta(days=3)


# (NOTE: booking api is disabled)

# @pytest.fixture
# def event18(client, user_auth_header, dt):
#     res = client.post(
#         '/api/bookings',
#         {
#             'date': dt.strftime('%Y-%m-%d'),
#             'room': 'Летняя',
#             'people': '3',
#             'startTime': '18:00',
#             'endTime': '19:00',
#         },
#         format='json',
#         **user_auth_header,
#     )
#     return res


# def test_list(client):
#     res = client.get('/api/bookings/today')
#     assert res.status_code == 200
#     assert res.json() == []


# def test_list_timezone(client, event18, dt):
#     res = client.get(f'/api/bookings/{dt:%Y-%m-%d}')
#     res.json()[0]['start'].endswith('T18:00:00+03:00')


# def test_list_my_by_anon(client):
#     res = client.get('/api/my/bookings')
#     assert res.status_code == 403


# def test_list_my_by_user(client, user_auth_header):
#     res = client.get('/api/my/bookings', **user_auth_header)
#     assert res.status_code == 200


# def test_add(event18):
#     assert event18.status_code == 200
