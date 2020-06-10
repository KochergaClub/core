from ariadne import MutationType
import kocherga.wagtail.models

from ... import models

Mutation = MutationType()


@Mutation.field('eventTimepadAnnouncementUpdate')
def eventTimepadAnnouncementUpdate(_, info, input):
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


@Mutation.field('eventVkAnnouncementUpdate')
def eventVkAnnouncementUpdate(_, info, input):
    event_id = input['event_id']

    event = models.Event.objects.get(uuid=event_id)
    assert not event.deleted

    announcement = event.vk_announcement

    for field in (
            'group',
    ):
        if field in input:
            setattr(announcement, field, input[field])

    announcement.full_clean()
    announcement.save()

    return {
        'ok': True,
        'event': event,
    }


@Mutation.field('eventVkAnnouncementSetImage')
def eventVkAnnouncementSetImage(_, info, input):
    event = models.Event.objects.get(uuid=input['event_id'])
    vk_announcement = event.vk_announcement

    image_id = input['image_id']
    if not image_id:
        vk_announcement.image = None
    else:
        vk_announcement.image = kocherga.wagtail.models.CustomImage.objects.get(pk=image_id)

    vk_announcement.full_clean()
    vk_announcement.save()
    models.Event.objects.notify_update()

    return {
        'ok': True,
        'event': event,
    }


@Mutation.field('eventAnnounce')
def eventAnnounce(_, info, input):
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


@Mutation.field('eventSetAnnounceUrl')
def eventSetAnnounceUrl(_, info, input):
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
