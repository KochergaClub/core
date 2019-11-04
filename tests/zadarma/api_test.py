def test_index(admin_client):
    res = admin_client.get('/api/zadarma/pbx_call')
    assert res.status_code == 200
