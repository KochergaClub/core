import pytest
pytestmark = pytest.mark.usefixtures('db')

import kocherga.events.fb


class TestCreate:
    @pytest.mark.asyncio
    async def test_create(self, event):
        event.description += 'Чтобы узнавать о новых мероприятиях, вступайте в группу: {{Entity|fb_id=1083453805000382|vk_id=kocherga_club|name=Кочерга}}.'

        result = await kocherga.events.fb.create(
            event,
            headless=False,
            select_self_location=False,
        )

        assert isinstance(result, kocherga.events.fb.FbAnnouncement)
        print(result.link)
