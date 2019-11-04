import pytest
pytestmark = [
    pytest.mark.slack,
]

import kocherga.slack.client
from kocherga.slack.models import User as SlackUser


class TestSlack:
    def test_token(self):
        token = kocherga.slack.client.token()
        assert token[-1] != '\n'

    def test_client(self):
        sc = kocherga.slack.client.client()
        assert sc

    def test_import(self):
        SlackUser.objects.import_from_slack()
        users = list(SlackUser.objects.all())
        assert len(users) > 0
        assert 'slava@kocherga-club.ru' in [u.email for u in users]
