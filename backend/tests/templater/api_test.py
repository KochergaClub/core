from tests.helpers.graphql import run_query


def test_html(client):
    res = client.get(
        '/api/templater/mailchimp/html?start_date=2017-03-01&end_date=2017-03-08',
    )
    assert res.status_code == 200
    assert res.get('X-Frame-Options') is None


def test_list(admin_client):
    res = run_query(
        admin_client,
        """
        {
            imageTemplatesAll {
                name
            }
        }
        """
    )
    assert type(res['imageTemplatesAll']) == list
