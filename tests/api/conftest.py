import pytest
import os
import json
from quart import Response

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

@pytest.fixture('session')
def api_client():
    app = kocherga.api.app.create_app(DEV=True)
    return app.test_client()
