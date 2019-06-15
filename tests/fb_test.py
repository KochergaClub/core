import pytest
pytestmark = pytest.mark.usefixtures('db')

from kocherga.fb.models import Auth


@pytest.mark.skip(reason="Manual test with short-living token")
def test_long_term():
    TOKEN = 'EAAX9MaZBcgKIBAGZCKieMOzJBhoLbti7ZCjZAJZBcEZCgDoCa1JPZAkWg44en3yuibQPk0q7zH7rZANZCT3GwItqS6KJOeyTwWFoxZALJx9C4icZBYcfM45IrP9UW3ABF6l6E5RcNsoi1nQbJWylbWZBlMZBBRIorLh9ez3UaQrxBWIN8rZAVyMENAzXXKbMaB66lGUDYZD'
    Auth.objects.set(TOKEN)
    auth = Auth.objects.get()
    auth.validate()

    assert auth.access_token != TOKEN
