import pytest
pytestmark = pytest.mark.usefixtures('db')

import json

def test_timepad_categories(client, kocherga_jwt_token):
    res = client.get(
        '/api/announcements/timepad/categories',
        AUTHORIZATION='JWT ' + kocherga_jwt_token,
    )
    assert res.status_code == 200
    categories = res.json()

    assert len(categories) > 5

def test_weekly_digest(client, kocherga_jwt_token):
    res = client.post(
        '/api/announcements/email/post_digest',
        json.dumps({}),
        content_type='application/json',
        AUTHORIZATION='JWT ' + kocherga_jwt_token,
    )
    assert res.status_code == 200
