import pytest

pytestmark = [
    pytest.mark.google,
]

import re
import time
from datetime import datetime

import kocherga.vk.api
import wagtail.core.models
from kocherga.events import models
from kocherga.wagtail.utils import create_image_from_fh


class TestTexts:
    def test_tail(self, event):
        assert re.match(
            r'Встреча пройдёт в \w+ \d+ \w+, в \d+:\d+, в @kocherga_club \(центре рациональности Кочерга\)\. '
            r'Оплата участия — по тарифам антикафе: 2,5 руб\./минута\. Регистрация: http.*',
            event.vk_announcement.get_tail(),
        )


class TestCreate:
    def test_create_short(self, event):

        announcement = event.vk_announcement
        assert isinstance(announcement, models.VkAnnouncement)

        assert announcement.link == ''

        announcement.announce()
        assert announcement.link

        kocherga.vk.api.call(
            'wall.delete',
            {
                'owner_id': -announcement.group_id(),
                'post_id': announcement.post_id(),
            },
        )

    def test_create_long(self, event_for_edits, image_file):
        event = event_for_edits
        announcement = event.vk_announcement

        with open(image_file, 'rb') as fh:
            image = create_image_from_fh(
                fh,
                title='test',
                basename='test',
                user=None,
                collection=wagtail.core.models.Collection.objects.first(),
            )
            announcement.image = image
            announcement.save()

        announcement.group = 159971736
        event.description = 'Длинный текст.\n' * 100
        event.save()
        announcement.save()

        announcement.announce()

        assert isinstance(announcement, models.VkAnnouncement)

        time.sleep(1)
        kocherga.vk.api.call(
            'wall.delete',
            {
                'owner_id': -announcement.group_id(),
                'post_id': announcement.post_id(),
            },
        )

    def test_create_without_group(self, minimal_event):
        assert minimal_event.vk_announcement.group == ''
        with pytest.raises(Exception, match='group is not set'):
            minimal_event.vk_announcement.announce()


class TestGroups:
    def test_groups_none(self):

        result = models.VkAnnouncement.objects.all_groups()

        assert isinstance(result, list)
        assert len(result) == 0

    def test_groups_single(self, event):
        ann = event.vk_announcement
        ann.group = 'blahblah_something'
        ann.save()

        result = models.VkAnnouncement.objects.all_groups()

        assert isinstance(result, list)
        assert len(result) == 1
        assert result[0] == 'blahblah_something'


class TestRepostToDaily:
    def test_repost_to_daily_empty(self):
        models.VkAnnouncement.objects.repost_to_daily()

    def test_repost_to_daily_single(self, event):
        event.start = datetime.combine(datetime.today().date(), event.start.timetz())
        event.published = True
        event.save()
        event.vk_announcement.announce()
        time.sleep(1)

        assert models.VkAnnouncement.objects.count() == 1
        with pytest.raises(Exception, match="Access denied: can't publish"):
            models.VkAnnouncement.objects.repost_to_daily()
