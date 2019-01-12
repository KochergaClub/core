import pytest

import logging
import os
import json
import datetime
from quart import Response
import jwt

import kocherga.config
import kocherga.images

@pytest.fixture
def upload(tmpdir):
    upload = tmpdir.mkdir('upload')
    kocherga.config.config()['image_storage_dir'] = upload
    kocherga.images.image_storage.set_directory(upload)

os.environ['TIER'] = 'dev'
os.environ['JWT_SECRET_KEY'] = 'testkey'

import kocherga.api.app

def _jwt_token(email):
    return jwt.encode(
        payload={
            "email": email,
            "source": "test",
            "exp": datetime.datetime.utcnow() + datetime.timedelta(weeks=50),
        },
        key=os.environ['JWT_SECRET_KEY'],
        algorithm="HS256",
    ).decode('utf-8')

@pytest.fixture
def kocherga_jwt_token():
    return _jwt_token('test@kocherga-club.ru')

@pytest.fixture
def kocherga_auth_header(kocherga_jwt_token):
    return {'AUTHORIZATION': 'JWT ' + kocherga_jwt_token}

@pytest.fixture
def user_jwt_token():
    return _jwt_token('somebody@example.com')

@pytest.fixture
def api_client(db):
    logging.info('api_client fixture')
    app = kocherga.api.app.create_app(DEV=True)
    logging.info('api_client fixture app created')
    return app.test_client()
