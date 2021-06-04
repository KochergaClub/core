import pytest
from django.conf import settings
from django.contrib.auth import get_user_model
from django.core import mail
from kocherga.auth.utils import get_magic_token
from tests.helpers.graphql import run_query


class TestAnyLogin:
    def test_no_credentials(self, client):
        data = run_query(
            client,
            """
        mutation Login {
          authLogin(input: {
            credentials: {}
            result: "cookie"
          }) {
            error
          }
        }
        """,
        )
        assert data['authLogin']['error'].startswith("One of `token`")


class TestTokenLogin:
    LOGIN_MUTATION = """
        mutation Login($token: String!) {
            authLogin(input: {
                credentials: {
                    token: $token
                }
                result: "cookie"
            }) {
                error
                registered
                user {
                    is_authenticated
                }
            }
        }
    """

    def test_bad_token(self, client):
        data = run_query(client, self.LOGIN_MUTATION, {'token': 'bad'})
        assert data['authLogin']['error'] == "Invalid token"

    def test_result_param(self, client):
        token = get_magic_token('test@example.com')
        data = run_query(
            client,
            """
        mutation Login {
          authLogin(input: {
            credentials: {
              token: """
            + '"'
            + token
            + '"'
            + """
            }
            result: "unknown"
          }) {
            error
          }
        }
        """,
        )
        assert data['authLogin']['error'] == "Only `cookie` result is supported"

    def test_good(self, client):
        token = get_magic_token('test@example.com')
        data = run_query(client, self.LOGIN_MUTATION, {'token': token})

        assert data['authLogin']['error'] is None
        assert data['authLogin']['registered'] is True
        assert data['authLogin']['user']['is_authenticated'] is True
        assert client.cookies['sessionid']
        assert client.cookies['csrftoken']

        data = run_query(client, """{ my { user { is_authenticated } } }""")
        assert data['my']['user']['is_authenticated'] is True

    def test_registered_value(self, client):
        def _login():
            return run_query(
                client,
                self.LOGIN_MUTATION,
                {'token': get_magic_token('test@example.com')},
            )

        data = _login()
        data = _login()
        assert data['authLogin']['registered'] is False


class TestPasswordLogin:
    LOGIN_MUTATION = """
        mutation Login($email: String!, $password: String!) {
            authLogin(input: {
                credentials: {
                    email: $email
                    password: $password
                }
                result: "cookie"
            }) {
                error
                registered
                user {
                    is_authenticated
                }
            }
        }
    """
    EMAIL = 'somebody@example.com'
    PASSWORD = 'axej2d4adr'

    def test_no_password(self, client):
        res = run_query(
            client,
            """
                mutation LoginWithoutPassword {
                    authLogin(input: {
                        credentials: {
                            email: "somebody@example.com"
                        }
                        result: "cookie"
                    }) {
                        error
                    }
                }
            """,
        )
        assert res['authLogin']['error'].startswith("One of `token`")

    def test_bad_password_wrong_user(self, client):
        res = run_query(
            client,
            self.LOGIN_MUTATION,
            {'email': self.EMAIL, 'password': 'password_for_nonexistent_user'},
        )
        assert res['authLogin']['error'] == "Некорректные учетные данные."
        assert not res['authLogin']['user']

    def test_bad_password_existing_user(self, client):
        get_user_model().objects.create_user(self.EMAIL)

        res = run_query(
            client,
            self.LOGIN_MUTATION,
            {'email': self.EMAIL, 'password': 'bad_password'},
        )
        assert res['authLogin']['error']
        assert not res['authLogin']['user']

    def test_success(self, client):
        user = get_user_model().objects.create_user(self.EMAIL)
        user.set_password(self.PASSWORD)
        user.save()

        res = run_query(
            client,
            self.LOGIN_MUTATION,
            {'email': self.EMAIL, 'password': self.PASSWORD},
        )
        assert res['authLogin']['registered'] is False
        assert client.cookies['sessionid']


class TestSetPassword:
    EMAIL = 'somebody@example.com'
    PASSWORD = 'axej2d4adr'
    NEW_PASSWORD = 'qwe83nvf'

    SET_PASSWORD_MUTATION = """
    mutation SetPassword($old_password: String, $new_password: String!) {
        result: setMyPassword(input: {
          old_password: $old_password
          new_password: $new_password
        }) {
            __typename
            ...on GenericError {
                message
            }
            ...on ValidationError {
                errors {
                    name
                    messages
                }
            }
        }
    }
    """

    def test_set_first_password(self, client):
        user = get_user_model().objects.create_user(self.EMAIL)
        client.force_login(user)

        res = run_query(
            client,
            self.SET_PASSWORD_MUTATION,
            {'new_password': self.NEW_PASSWORD},
        )
        assert res['result']['__typename'] == 'SetMyPasswordOkResult'
        user.check_password(self.NEW_PASSWORD)

    def test_no_old_password(self, client):
        user = get_user_model().objects.create_user(self.EMAIL)
        user.set_password(self.PASSWORD)
        user.save()
        client.force_login(user)

        res = run_query(
            client,
            self.SET_PASSWORD_MUTATION,
            {'new_password': self.NEW_PASSWORD},
        )
        assert res['result']['__typename'] == 'ValidationError'
        assert res['result']['errors'][0]['messages'][0] == 'Пароль не указан.'

    def test_success(self, client):
        user = get_user_model().objects.create_user(self.EMAIL)
        user.set_password(self.PASSWORD)
        user.save()
        client.force_login(user)

        res = run_query(
            client,
            self.SET_PASSWORD_MUTATION,
            {'old_password': self.PASSWORD, 'new_password': self.NEW_PASSWORD},
        )
        assert res['result']['__typename'] == 'SetMyPasswordOkResult'

        user.check_password(self.NEW_PASSWORD)


class TestLogout:
    def test_logout(self, client, basic_user):
        client.force_login(basic_user)

        assert client.session.get('_auth_user_id')

        res = run_query(
            client,
            """
            mutation Logout {
                authLogout {
                    ok
                }
            }
            """,
        )

        assert res['authLogout']['ok']
        assert not client.session.get('_auth_user_id')


class TestGetMagicToken:
    @pytest.fixture(autouse=True)
    def email_backend_setup(self):
        settings.EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'

    def test_send(self, client):
        res = run_query(
            client,
            """
            mutation SendMagicLink {
                authSendMagicLink(input: {
                    email: "somebody@example.com"
                }) {
                    ok
                }
            }
            """,
        )
        assert res['authSendMagicLink']['ok']
        assert len(mail.outbox) == 1
        assert mail.outbox[0].subject == 'Войти на сайт Кочерги'
