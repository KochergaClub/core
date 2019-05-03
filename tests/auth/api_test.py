import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
]

import json

from django.conf import settings
from django.core import mail
from kocherga.auth.view_utils import get_magic_token


def test_me_not_authenticated(client):
    res = client.get('/api/me')
    assert res.status_code == 200
    assert res.json()['is_authenticated'] is False

class TestGetMagicToken:
    @pytest.fixture(autouse=True)
    def email_backend_setup(self):
        settings.EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'

    def test_send(self, client):
        res = client.post('/api/login/send-magic-link', {
            'email': 'somebody@example.com',
        })
        assert res.status_code == 200
        assert len(mail.outbox) == 1
        assert mail.outbox[0].subject == 'Войти на сайт Кочерги'
        print(mail.outbox[0].body)

class TestLogin:
    def test_no_credentials(self, client):
        res = client.post(
            '/api/login',
            json.dumps({}),
            content_type='application/json',
        )
        assert res.json()['detail'] == "credentials are not set"
        assert res.status_code == 500

    def test_no_token(self, client):
        res = client.post(
            '/api/login',
            json.dumps({
                'credentials': {},
            }),
            content_type='application/json',
        )
        assert res.json()['detail'] == "token is not set in credentials"
        assert res.status_code == 500

    def test_bad_token(self, client):
        res = client.post(
            '/api/login',
            json.dumps({
                'credentials': {
                    'token': 'bad',
                },
            }),
            content_type='application/json',
        )
        assert res.json()['detail'] == "Invalid token"
        assert res.status_code == 500

    def test_result_param_required(self, client):
        res = client.post(
            '/api/login',
            json.dumps({
                'credentials': {
                    'token': get_magic_token('test@example.com'),
                },
            }),
            content_type='application/json',
        )
        assert res.json()['detail'] == "result parameter is not set"
        assert res.status_code == 500

    def test_result_param(self, client):
        res = client.post(
            '/api/login',
            json.dumps({
                'credentials': {
                    'token': get_magic_token('test@example.com'),
                },
                'result': 'unknown',
            }),
            content_type='application/json',
        )
        assert res.json()['detail'] == "Only `cookie` result is supported"
        assert res.status_code == 500

    def test_good(self, client):
        res = client.post(
            '/api/login',
            json.dumps({
                'credentials': {
                    'token': get_magic_token('test@example.com'),
                },
                'result': 'cookie',
            }),
            content_type='application/json',
        )
        assert res.status_code == 200
        assert res.json()['registered'] is True
        assert client.cookies['sessionid']
        assert client.cookies['csrftoken']

        res = client.get('/api/me')
        assert res.status_code == 200
        assert res.json()['is_authenticated'] is True

    def test_registered_value(self, client):
        for i in range(2):
            res = client.post(
                '/api/login',
                json.dumps({
                    'credentials': {
                        'token': get_magic_token('test@example.com'),
                    },
                    'result': 'cookie',
                }),
                content_type='application/json',
            )
        assert res.status_code == 200
        assert res.json()['registered'] is False
