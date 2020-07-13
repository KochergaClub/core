from typing import Optional

from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import staffonly

import kocherga.wagtail.models

from ... import models

from .events import EventUpdateResult

c = helpers.Collection()


EventAnnounceTarget = g.EnumType(
    'EventAnnounceTarget', {'VK': 1, 'FB': 2, 'TIMEPAD': 3}
)


@c.class_field
class eventTimepadAnnouncementUpdate(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        event_id = input['event_id']

        event = models.Event.objects.get(uuid=event_id)
        assert not event.deleted

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
        assert not event.deleted

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

        assert not event.deleted
        assert event.event_type == 'public'

        target = input['target']
        if target == 'VK':
            event.vk_announcement.announce()
        elif target == 'FB':
            event.fb_announcement.announce()
        elif target == 'TIMEPAD':
            event.timepad_announcement.announce()

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

        assert not event.deleted
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
