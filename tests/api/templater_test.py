import pytest
pytestmark = pytest.mark.usefixtures('db')


def test_html(client):
    res = client.get(
        '/api/templater/mailchimp/html?start_date=2017-03-01&end_date=2017-03-08',
    )
    assert res.status_code == 200
    assert res.get('X-Frame-Options') is None


def test_list(client, kocherga_auth_header):
    res = client.get(
        '/api/templater',
        **kocherga_auth_header
    )
    assert res.status_code == 200
    data = res.json()
    assert type(data) == list
