def test_options(client):
    res = client.options('/api/graphql')
    assert res.status_code == 200
    assert res['Access-Control-Allow-Origin'] == '*'


def test_exceptions(client):
    res = client.get('/api/nosuchroute')
    assert res.status_code == 404
