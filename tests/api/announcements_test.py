import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
    pytest.mark.google,  # events require google for now (don't forget to remove this later)
]


def test_timepad_categories(client, kocherga_auth_header):
    res = client.get(
        '/api/announcements/timepad/categories',
        **kocherga_auth_header
    )
    assert res.status_code == 200
    categories = res.json()

    assert len(categories) > 5


def test_vk_groups(client, event, kocherga_auth_header):
    res = client.get(
        '/api/announcements/vk/groups',
        **kocherga_auth_header
    )
    assert res.status_code == 200
    groups = res.json()

    assert len(groups) == 1


def test_fb_groups(client, event, kocherga_auth_header):
    res = client.get(
        '/api/announcements/fb/groups',
        **kocherga_auth_header
    )
    assert res.status_code == 200
    groups = res.json()

    assert len(groups) == 1


def test_weekly_digest(client, kocherga_auth_header):
    res = client.post(
        '/api/weekly-digest/current/mailchimp-draft',
        {},
        format='json',
        **kocherga_auth_header
    )
    assert res.status_code == 200
