import pytest
pytestmark = pytest.mark.usefixtures('db')

import kocherga.events.fb

import logging

class TestCreate:
    @pytest.mark.asyncio
    async def test_create(self, event):
        # logging.getLogger('pyppeteer').setLevel(logging.DEBUG)

        event.description += 'Чтобы узнавать о новых мероприятиях, вступайте в группу: {{Entity|fb_id=1083453805000382|vk_id=kocherga_club|name=Кочерга}}.'

        result = await kocherga.events.fb.create(
            event,
            headless=False,
            select_self_location=False,
            access_token='EAACEdEose0cBAJtgS5vKGSTZAWvv4FK7urwcaXf1j3Nn2P2lyUoLrtU7faIHsZB1dVHWBXMTRxcGEX6a9nSzkfE0YgFZALzZATrXl1ZAeMKVoYfKD7rYjVTl0in1vx7egcbj6yDAHIDGfC4WfQgDeeYs5lxNnQgeDccyhzVcCpLEoWKOxSRsZCbpgeIvN12LDNW1BzyaxalwZDZD'
        )

        assert isinstance(result, kocherga.events.fb.FbAnnouncement)
        print(result.link)
