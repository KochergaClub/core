import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
]

import json

from django.conf import settings
from django.core import mail
from django.contrib.auth import get_user_model

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
        res = client.post('/api/auth/send-magic-link', {
            'email': 'somebody@example.com',
        })
        assert res.status_code == 200
        assert len(mail.outbox) == 1
        assert mail.outbox[0].subject == 'Войти на сайт Кочерги'


class TestAnyLogin:
    def test_no_credentials(self, client):
        res = client.post(
            '/api/auth/login',
            {},
            format='json',
        )
        assert res.json()['detail'] == "credentials are not set"
        assert res.status_code == 400

    def test_empty_credentials(self, client):
        res = client.post(
            '/api/auth/login',
            {
                'credentials': {},
            },
            format='json',
        )
        assert res.json()['detail'].startswith("One of `token`")
        assert res.status_code == 400


class TestTokenLogin:
    def test_bad_token(self, client):
        res = client.post(
            '/api/auth/login',
            {
                'credentials': {
                    'token': 'bad',
                },
                'result': 'cookie',
            },
            format='json',
        )
        assert res.json()['detail'] == "Некорректные учетные данные."
        assert res.status_code == 403

    def test_result_param_required(self, client):
        res = client.post(
            '/api/auth/login',
            {
                'credentials': {
                    'token': get_magic_token('test@example.com'),
                },
            },
            format='json',
        )
        assert res.json()['detail'] == "result parameter is not set"
        assert res.status_code == 400

    def test_result_param(self, client):
        res = client.post(
            '/api/auth/login',
            {
                'credentials': {
                    'token': get_magic_token('test@example.com'),
                },
                'result': 'unknown',
            },
            format='json',
        )
        assert res.json()['detail'] == "Only `cookie` result is supported"
        assert res.status_code == 400

    def test_good(self, client):
        res = client.post(
            '/api/auth/login',
            {
                'credentials': {
                    'token': get_magic_token('test@example.com'),
                },
                'result': 'cookie',
            },
            format='json',
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
                '/api/auth/login',
                {
                    'credentials': {
                        'token': get_magic_token('test@example.com'),
                    },
                    'result': 'cookie',
                },
                format='json',
            )
        assert res.status_code == 200
        assert res.json()['registered'] is False


class TestPasswordLogin:
    EMAIL = 'somebody@example.com'
    PASSWORD = 'axej2d4adr'

    def test_no_password(self, client):
        res = client.post(
            '/api/auth/login',
            {
                'credentials': {
                    'email': self.EMAIL,
                },
                'result': 'cookie',
            },
            format='json',
        )
        assert res.json()['detail'].startswith("One of `token`")
        assert res.status_code == 400

    def test_bad_password_wrong_user(self, client):
        res = client.post(
            '/api/auth/login',
            {
                'credentials': {
                    'email': self.EMAIL,
                    'password': 'password_for_nonexistent_user'
                },
                'result': 'cookie',
            },
            format='json',
        )
        assert res.json()['detail'] == "Некорректные учетные данные."
        assert res.status_code == 403

    def test_bad_password_existing_user(self, client):
        get_user_model().objects.create_user(self.EMAIL)

        res = client.post(
            '/api/auth/login',
            {
                'credentials': {
                    'email': self.EMAIL,
                    'password': 'bad_password'
                },
                'result': 'cookie',
            },
            format='json',
        )
        assert res.status_code == 403

    def test_success(self, client):
        user = get_user_model().objects.create_user(self.EMAIL)
        user.set_password(self.PASSWORD)
        user.save()

        res = client.post(
            '/api/auth/login',
            {
                'credentials': {
                    'email': self.EMAIL,
                    'password': self.PASSWORD,
                },
                'result': 'cookie',
            },
            format='json',
        )
        assert res.status_code == 200
        assert res.json()['registered'] is False
        assert client.cookies['sessionid']


class TestSetPassword:
    EMAIL = 'somebody@example.com'
    PASSWORD = 'axej2d4adr'
    NEW_PASSWORD = 'qwe83nvf'

    def test_not_signed_in(self, client):
        user = get_user_model().objects.create_user(self.EMAIL)
        user.set_password(self.PASSWORD)
        user.save()

        res = client.post(
            '/api/auth/set-password',
            {
                'old_password': self.PASSWORD,
            },
            format='json',
        )
        assert res.status_code == 403
        assert res.json()['detail'], 'Учетные данные не были предоставлены.'

    def test_set_first_password(self, client):
        user = get_user_model().objects.create_user(self.EMAIL)
        client.force_login(user)

        res = client.post(
            '/api/auth/set-password',
            {
                'new_password': self.NEW_PASSWORD,
            },
            format='json',
        )

        assert res.status_code == 200
        user.check_password(self.NEW_PASSWORD)

    def test_no_old_password(self, client):
        user = get_user_model().objects.create_user(self.EMAIL)
        user.set_password(self.PASSWORD)
        user.save()
        client.force_login(user)

        res = client.post(
            '/api/auth/set-password',
            {
                'new_password': self.NEW_PASSWORD,
            },
            format='json',
        )
        assert res.status_code == 403
        assert res.json()['detail'] == '`old_password` is not set but user has a password'

    def test_success(self, client):
        user = get_user_model().objects.create_user(self.EMAIL)
        user.set_password(self.PASSWORD)
        user.save()
        client.force_login(user)

        res = client.post(
            '/api/auth/set-password',
            {
                'old_password': self.PASSWORD,
                'new_password': self.NEW_PASSWORD,
            },
            format='json',
        )
        assert res.status_code == 200

        user.check_password(self.NEW_PASSWORD)
