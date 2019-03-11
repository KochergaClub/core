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
            access_token='EAAX9MaZBcgKIBANdMvK1ILR5BHvSrs7P3iZB6dilKyil1KLfuLYuqc0qKdtCnVRrNcDQMid8wBlAJG6RvnwYpu1ZCgdEG1MOrxAd37HRXnDYCaV3BRcCvn4WcQk8hVgikdYkWSP3gbEhZAE93M6BtBA39o1McZCankAbw2vQgbGQzUZAaIhmfDZBad1TrJuNg0ZD'
        )

        assert isinstance(result, kocherga.events.fb.FbAnnouncement)
        print(result.link)
