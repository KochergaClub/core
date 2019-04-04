import datetime

import pytest
import jwt

from django.conf import settings
from django.contrib.auth import get_user_model

import kocherga.images


@pytest.fixture
def upload(tmpdir):
    upload = tmpdir.mkdir('upload')
    settings.configure(
        DATA_DIR = str(tmpdir)
    )
    kocherga.images.image_storage.set_directory(upload)


def _jwt_token(email):
    return jwt.encode(
        payload={
            "email": email,
            "source": "test",
            "exp": datetime.datetime.utcnow() + datetime.timedelta(weeks=50),
        },
        key=settings.KOCHERGA_JWT_SECRET_KEY,
        algorithm="HS256",
    ).decode('utf-8')


def _auth_header(email):
    token = _jwt_token(email)
    return {'HTTP_AUTHORIZATION': 'JWT ' + token}


@pytest.fixture
def kocherga_auth_header(common_team):
    return _auth_header('test@kocherga-club.ru')


@pytest.fixture
def user_auth_header(common_team):
    email = 'somebody@example.com'
    get_user_model().objects.create_user(email)
    return _auth_header(email)
