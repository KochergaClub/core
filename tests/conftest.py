import kocherga.api.app
import pytest

@pytest.fixture
def app():
    return kocherga.api.app.create_app(DEV=True)
