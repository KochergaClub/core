import pytest
import os
import json
from quart import Response

os.environ['TIER'] = 'dev'
os.environ['JWT_SECRET_KEY'] = 'testkey'

import kocherga.api.app

@pytest.fixture('session')
def api_client():
    app = kocherga.api.app.create_app(DEV=True)
    return app.test_client()
