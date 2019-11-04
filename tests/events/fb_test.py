import pytest


class TestCreate:
    @pytest.mark.slow
    @pytest.mark.skip(reason="FB keeps banning our test users")
    @pytest.mark.asyncio
    async def test_create(self, event):
        event.description += (
            "Чтобы узнавать о новых мероприятиях, вступайте в группу: "
            "{{Entity|fb_id=1083453805000382|vk_id=kocherga_club|name=Кочерга}}."
        )
        event.save()

        link = await event.fb_announcement.create(
            event,
            headless=False,
            select_self_location=False,
        )

        assert link
