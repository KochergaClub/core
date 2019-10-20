import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
    pytest.mark.google,  # events require google for now (don't forget to remove this later)
]


def test_timepad_categories(admin_client):
    res = admin_client.get('/api/announcements/timepad/categories')
    assert res.status_code == 200
    categories = res.json()

    assert len(categories) > 5


def test_vk_groups(admin_client, event):
    res = admin_client.get('/api/announcements/vk/groups')
    assert res.status_code == 200
    groups = res.json()

    assert len(groups) == 1


def test_fb_groups(admin_client, event):
    res = admin_client.get('/api/announcements/fb/groups')
    assert res.status_code == 200
    groups = res.json()

    assert len(groups) == 1


def test_vk_announce(admin_client, event):
    res = admin_client.post(
        f'/api/announcements/vk/{event.uuid}/announce',
        {},
        format='json',
    )
    assert res.status_code == 200

    res = admin_client.get(f'/api/event/{event.uuid}')
    assert res.status_code == 200
    print(res.json())
    assert res.json()['posted_vk']


def test_vk_announce_old(admin_client, event):
    res = admin_client.post(
        f'/api/announcements/vk/event/{event.uuid}',
        {},
        format='json',
    )
    assert res.status_code == 200

    res = admin_client.get(f'/api/event/{event.uuid}')
    assert res.status_code == 200
    print(res.json())
    assert res.json()['posted_vk']


def test_weekly_digest(admin_client):
    res = admin_client.post(
        '/api/weekly-digest/current/mailchimp-draft',
        {},
        format='json',
    )
    assert res.status_code == 200
