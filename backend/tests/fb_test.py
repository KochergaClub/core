import pytest

from kocherga.fb.models import Auth


@pytest.mark.skip(reason="Manual test with short-living token")
def test_long_term():
    TOKEN = 'EAAFKU6CgnoIBAKFYBKuJ0jv3gI6QZBj0lg2nmQYxvX6Y0AXykIFvaZBroJabxHlZBbzXitCud39BQSUjP7FQRha4d5MrpoHtGNU9DhrTNk2D5X2oXjmOSlLWLOhBiYiKk9o4blONe4ZAsSflvLGk36i1IWpt09RlFNouMg6bdAZDZD'
    Auth.objects.set(TOKEN)
    auth = Auth.objects.get()
    auth.validate()

    assert len(auth.access_token) >= 40
    assert auth.access_token != TOKEN
