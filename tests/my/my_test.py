import pytest
pytestmark = pytest.mark.usefixtures('db')

from django.contrib.auth import get_user_model


def test_index(client):
    client.force_login(
        get_user_model().objects.create_user(email='test@example.com')
    )
    response = client.get('/my/')
    assert response.status_code == 200
