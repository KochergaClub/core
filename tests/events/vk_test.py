import pytest
pytestmark = [
    pytest.mark.usefixtures('db'),
    pytest.mark.google,
]

import re
from datetime import datetime

import kocherga.vk.api
import kocherga.events.vk
import kocherga.events.announce


class TestTexts:
    def test_tail(self, event):
        assert re.match(
            r'Встреча пройдёт в \w+ \d+ \w+, в \d+:\d+, в @kocherga_club \(антикафе Кочерга\)\. Оплата участия — по тарифам антикафе: 2,5 руб\./минута\.$',
            kocherga.events.vk.vk_tail(event)
        )


class TestCreate:
    def test_create(self, event):

        result = kocherga.events.vk.create(event)

        assert isinstance(result, kocherga.events.vk.VkAnnouncement)
        print(result.link)

        kocherga.vk.api.call('wall.delete', {
            'owner_id': -result.group_id,
            'post_id': result.post_id,
        })

    def test_create_long(self, event_for_edits, image_file):
        event = event_for_edits

        with open(image_file, 'rb') as fh:
            event.add_image('vk', fh)

        event.vk_group = 159971736
        event.description = 'Длинный текст.\n' * 100
        event.save()

        result = kocherga.events.vk.create(event)

        assert isinstance(result, kocherga.events.vk.VkAnnouncement)

        kocherga.vk.api.call('wall.delete', {
            'owner_id': -result.group_id,
            'post_id': result.post_id,
        })

    def test_create_without_group(self, minimal_event):
        assert minimal_event.vk_group == ''
        with pytest.raises(Exception, match='vk_group is not set'):
            kocherga.events.vk.create(minimal_event)


class TestGroups:
    def test_groups_none(self):

        result = kocherga.events.vk.all_groups()

        assert isinstance(result, list)
        assert len(result) == 0

    def test_groups_single(self, event):
        event.vk_group = 'blahblah_something'
        event.save()

        result = kocherga.events.vk.all_groups()

        assert isinstance(result, list)
        assert len(result) == 1
        assert result[0] == 'blahblah_something'


class TestSchedule():
    def test_schedule_post(self):
        kocherga.events.vk.create_schedule_post('')


class TestRepostToDaily():
    def test_repost_to_daily_empty(self):
        kocherga.events.vk.repost_to_daily()

    def test_repost_to_daily_single(self, event):
        event.start_dt = datetime.combine(datetime.today().date(), event.start_dt.time())
        event.save()
        kocherga.events.announce.post_to_vk(event)

        with pytest.raises(Exception, match="Access denied: can't publish"):
            kocherga.events.vk.repost_to_daily()
