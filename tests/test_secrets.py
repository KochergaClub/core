import pytest

import kocherga.secrets

class TestPlainSecret:
    def test_timepad(self):
        assert type(kocherga.secrets.plain_secret('timepad_token')) == str

    def test_nonexistent(self):
        with pytest.raises(FileNotFoundError):
            kocherga.secrets.plain_secret('no_such_token')

class TestJsonSecret:
    def test_google(self):
        assert type(kocherga.secrets.json_secret('google_credentials.json')) == dict

    def test_nonexistent(self):
        with pytest.raises(FileNotFoundError):
            kocherga.secrets.json_secret('no_such_token.json')
