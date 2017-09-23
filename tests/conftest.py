import kocherga.api
import pytest

@pytest.fixture
def app():
    app = kocherga.api.create_app(DEV=True)
    return app
