import pytest

from datetime import datetime, timedelta
import shutil
import os.path

import kocherga.vk
import kocherga.events.vk

from kocherga.events.event import Event

class TestCreate:
    def test_create(self, event):

        result = kocherga.events.vk.create(event)

        assert isinstance(result, kocherga.events.vk.VkAnnouncement)
        print(result.link)

        kocherga.vk.call('wall.delete', {
            'owner_id': -result.group_id,
            'post_id': result.post_id,
        })

    def test_create_long(self, event_for_edits, image_file):
        event = event_for_edits

        with open(image_file, 'rb') as fh:
            event.add_image('vk', fh)

        kocherga.events.db.set_event_property(event.google_id, 'vk_group', 159971736)
        event = kocherga.events.db.patch_event(event.google_id, { 'description': 'Длинный текст.\n' * 100 })

        result = kocherga.events.vk.create(event)

        assert isinstance(result, kocherga.events.vk.VkAnnouncement)
        print(result.link)

        kocherga.vk.call('wall.delete', {
            'owner_id': -result.group_id,
            'post_id': result.post_id,
        })

    def test_create_without_group(self, minimal_event):
        with pytest.raises(Exception, match='vk_group is not set'):
            result = kocherga.events.vk.create(minimal_event)
