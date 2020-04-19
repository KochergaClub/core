from ariadne import MutationType

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
        'ok': True
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
        'ok': True
    }
