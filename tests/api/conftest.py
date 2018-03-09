import pytest
import os
import json
from quart import Response

os.environ['TIER'] = 'dev'
os.environ['JWT_SECRET_KEY'] = 'testkey'

import kocherga.api.app

#class TestResponse(Response):
#    @property
#    def json(self):
#        return json.loads(self.data)

@pytest.fixture('session')
def api_client():
    app = kocherga.api.app.create_app(DEV=True)
    # app.response_class = TestResponse
    # Don't set `app.testing = True` - we want to distinguish PublicError from generic Exceptions to check for information leaks. Eventually.
    return app.test_client()
