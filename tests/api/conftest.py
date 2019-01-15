import pytest

import logging
import os
import json
import datetime
from quart import Response
import jwt

from django.conf import settings
import kocherga.images

@pytest.fixture
def upload(tmpdir):
    upload = tmpdir.mkdir('upload')
    settings.configure(
        KOCHERGA_IMAGE_STORAGE_DIR = str(d)
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
    return _auth_header('somebody@example.com')
