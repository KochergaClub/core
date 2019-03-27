import pytest
pytestmark = pytest.mark.slack

import kocherga.slack


class TestSlack:
    def test_token(self):
        token = kocherga.slack.token()
        assert token[-1] != '\n'

    def test_client(self):
        sc = kocherga.slack.client()
        assert sc

    def test_users(self):
        users = kocherga.slack.users()
        assert type(users) == list
        assert len(users) > 3

    def test_users_by_email(self):
        users = kocherga.slack.users_by_email()
        assert type(users) == dict
        assert len(users) >= 1
        assert 'slava@kocherga-club.ru' in users
