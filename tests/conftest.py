import pytest
import os

os.environ['TIER'] = 'dev'
os.environ['JWT_SECRET_KEY'] = 'testkey'

import kocherga.api.app

@pytest.fixture
def app():
    return kocherga.api.app.create_app(DEV=True)
