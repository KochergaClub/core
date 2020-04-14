from io import BytesIO
import dateutil.parser

import requests

from ariadne import MutationType
import wagtail.images.models

import kocherga.projects.models

from ... import models

Mutation = MutationType()


@Mutation.field('eventCreate')
def eventCreate(_, info, input):
    title = input['title']
    start = input['start']
    end = input['end']

    start = dateutil.parser.isoparse(start)
    end = dateutil.parser.isoparse(end)

    models.Event.objects.create(
        title=title,
        start=start,
        end=end,
        creator=info.context.user.email,
    )

    return {
        'ok': True,
    }


@Mutation.field('eventUpdate')
def eventUpdate(_, info, input):
    event_id = input['event_id']

    event = models.Event.objects.get(uuid=event_id)
    assert not event.deleted

    for field in (
            'published',
            'visitors',
            'event_type',
            'registration_type',
            'title',
            'description',
            'summary',
            'timing_description_override',
            'location',
            'zoom_link',
    ):
        if field in input:
            setattr(event, field, input[field])

    if 'prototype_id' in input:
        if not input['prototype_id']:
            event.prototype = None
        else:
            event.prototype = models.EventPrototype.objects.get(pk=input['prototype_id'])

    if 'project_slug' in input:
        if not input['project_slug']:
            event.project = None
        else:
            event.project = kocherga.projects.models.ProjectPage.objects.live().public().get(slug=input['project_slug'])

    if 'image_id' in input:
        if not input['image_id']:
            event.image = None
        else:
            event.image = wagtail.images.models.Image.objects.get(pk=input['image_id'])

    event.full_clean()
    event.save()

    return {
        'ok': True,
        'event': event,
    }


@Mutation.field('eventDelete')
def eventDelete(_, info, input):
    event_id = input['event_id']

    event = models.Event.objects.get(uuid=event_id)
    assert not event.deleted
    event.delete()

    return {
        'ok': True
    }


@Mutation.field('eventSetEventType')
def eventSetEventType(_, info, input):
    event_id = input['event_id']
    event_type = input['event_type']

    event = models.Event.objects.get(uuid=event_id)
    assert not event.deleted

    event.event_type = event_type
    event.full_clean()
    event.save()

    return {
        'ok': True
    }


@Mutation.field('eventSetRealm')
def eventSetRealm(_, info, input):
    event_id = input['event_id']
    realm = input['realm']

    event = models.Event.objects.get(uuid=event_id)
    assert not event.deleted

    event.realm = realm
    event.full_clean()
    event.save()

    return {
        'ok': True
    }


@Mutation.field('eventSetPricingType')
def eventSetPricingType(_, info, input):
    event_id = input['event_id']
    pricing_type = input['pricing_type']

    event = models.Event.objects.get(uuid=event_id)
    assert not event.deleted

    event.pricing_type = pricing_type
    event.full_clean()
    event.save()

    return {
        'ok': True
    }


@Mutation.field('eventSetZoomLink')
def eventSetZoomLink(_, info, input):
    event_id = input['event_id']
    zoom_link = input['zoom_link']

    event = models.Event.objects.get(uuid=event_id)
    event.set_zoom_link(zoom_link)

    return {
        'ok': True
    }


@Mutation.field('eventGenerateZoomLink')
def eventGenerateZoomLink(_, info, input):
    event_id = input['event_id']

    event = models.Event.objects.get(uuid=event_id)
    event.generate_zoom_link()

    return {
        'ok': True
    }


@Mutation.field('eventAddTag')
def eventAddTag(_, info, input):
    event = models.Event.objects.get(uuid=input['event_id'])

    event.add_tag(input['tag'])

    return {
        'ok': True,
    }


@Mutation.field('eventDeleteTag')
def eventDeleteTag(_, info, input):
    event = models.Event.objects.get(uiud=input['event_id'])

    event.delete_tag(input['tag'])

    return {
        'ok': True,
    }


@Mutation.field('eventSetImageFromUrl')
def eventSetImageFromUrl(_, info, input):
    event = models.Event.objects.get(uuid=input['event_id'])

    url = input['url']

    r = requests.get(url)
    r.raise_for_status()

    fh = BytesIO(r.content)
    event.add_image(fh)

    return {
        'ok': True,
    }


@Mutation.field('eventVkAnnouncementSetImage')
def eventVkAnnouncementSetImage(_, info, input):
    event = models.Event.objects.get(uuid=input['event_id'])
    vk_announcement = event.vk_announcement

    image_id = input['image_id']
    if not image_id:
        vk_announcement.image = None
    else:
        vk_announcement.image = wagtail.images.models.Image.objects.get(pk=image_id)

    vk_announcement.full_clean()
    vk_announcement.save()

    return {
        'ok': True,
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

    return {
        'ok': True,
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

    return {
        'ok': True,
    }


@Mutation.field('eventMove')
def eventMove(_, info, input):
    event = models.Event.objects.get(uuid=input['event_id'])

    raise Exception("Not implemented")

    return {
        'ok': True,
    }
