import pytest
pytestmark = pytest.mark.usefixtures('db')

import kocherga.events.fb

class TestCreate:
    @pytest.mark.asyncio
    async def test_create(self, event):

        result = await kocherga.events.fb.create(event, headless=False, select_self_location=False)
        print(result)

        assert isinstance(result, kocherga.events.fb.FbAnnouncement)
        print(result.link)
