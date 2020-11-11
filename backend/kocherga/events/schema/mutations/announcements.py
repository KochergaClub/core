import logging

logger = logging.getLogger(__name__)

from typing import Optional

import kocherga.wagtail.models
from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import staffonly

from ... import models
from .events import EventUpdateResult

c = helpers.Collection()


EventAnnounceTarget = g.EnumType(
    'EventAnnounceTarget', {'VK': 'VK', 'FB': 'FB', 'TIMEPAD': 'TIMEPAD'}
)


@c.class_field
class eventTimepadAnnouncementUpdate(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        event_id = input['event_id']

        event = models.Event.objects.get(uuid=event_id)

        announcement = event.timepad_announcement

        for field in (
            'prepaid_tickets',
            'category_code',
        ):
            if field in input:
                setattr(announcement, field, input[field])

        announcement.full_clean()
        announcement.save()

        return {
            'ok': True,
            'event': event,
        }

    permissions = [staffonly]
    input = {
        'event_id': 'ID!',
        'prepaid_tickets': Optional[bool],
        'category_code': Optional[str],
    }
    result = EventUpdateResult


@c.class_field
class eventVkAnnouncementUpdate(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        event_id = input['event_id']

        event = models.Event.objects.get(uuid=event_id)

        announcement = event.vk_announcement

        for field in ('group',):
            if field in input:
                setattr(announcement, field, input[field])

        announcement.full_clean()
        announcement.save()

        return {
            'ok': True,
            'event': event,
        }

    permissions = [staffonly]
    input = {
        'event_id': 'ID!',
        'group': Optional[str],
    }
    result = EventUpdateResult


@c.class_field
class eventVkAnnouncementSetImage(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        event = models.Event.objects.get(uuid=input['event_id'])
        vk_announcement = event.vk_announcement

        image_id = input['image_id']
        if not image_id:
            vk_announcement.image = None
        else:
            vk_announcement.image = kocherga.wagtail.models.CustomImage.objects.get(
                pk=image_id
            )

        vk_announcement.full_clean()
        vk_announcement.save()
        models.Event.objects.notify_update()

        return {
            'ok': True,
            'event': event,
        }

    permissions = [staffonly]
    input = {
        'event_id': 'ID!',
        'image_id': 'ID!',
    }
    result = EventUpdateResult


@c.class_field
class eventAnnounce(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        event = models.Event.objects.get(uuid=input['event_id'])

        assert event.event_type == 'public'

        target = input['target']
        if target == 'VK':
            event.vk_announcement.announce()
        elif target == 'FB':
            event.fb_announcement.announce()
        elif target == 'TIMEPAD':
            event.timepad_announcement.announce()
        else:
            raise Exception(f"Unknown target {target}")

        models.Event.objects.notify_update()

        return {
            'ok': True,
            'event': event,
        }

    permissions = [staffonly]
    input = {
        'event_id': 'ID!',
        'target': g.NN(EventAnnounceTarget),
    }
    result = EventUpdateResult


@c.class_field
class eventSetAnnounceUrl(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        event = models.Event.objects.get(uuid=input['event_id'])

        assert event.event_type == 'public'

        url = input['url']
        target = input['target']

        announcement = None
        if target == 'VK':
            announcement = event.vk_announcement
        elif target == 'FB':
            announcement = event.fb_announcement
        elif target == 'TIMEPAD':
            announcement = event.timepad_announcement
        else:
            raise Exception(f"Unknown target {target}")

        announcement.link = url
        announcement.full_clean()
        announcement.save()
        models.Event.objects.notify_update()

        return {
            'ok': True,
            'event': event,
        }

    permissions = [staffonly]
    input = {
        'event_id': 'ID!',
        'target': g.NN(EventAnnounceTarget),
        'url': str,
    }
    result = EventUpdateResult


mutations = c.as_dict()
