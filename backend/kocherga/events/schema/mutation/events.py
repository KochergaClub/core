from io import BytesIO
import dateutil.parser

import requests

from ariadne import MutationType
import kocherga.wagtail.models

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

    params = {
        'title': title,
        'start': start,
        'end': end,
        'creator': info.context.user.email,
    }

    # optional fields
    for field in ('description', 'location'):
        if field in input:
            params[field] = input[field]

    event = models.Event.objects.create(**params)
    models.Event.objects.notify_update()  # send notification message to websocket

    return {
        'ok': True,
        'event': event,
    }


@Mutation.field('eventUpdate')
def eventUpdate(_, info, input):
    event_id = input['event_id']

    event = models.Event.objects.get(uuid=event_id)
    assert not event.deleted

    for field in (
            'published',
            'visitors',
            'title',
            'description',
            'summary',
            'event_type',
            'registration_type',
            'pricing_type',
            'realm',
            'timing_description_override',
            'location',
            'zoom_link',
    ):
        if field in input:
            setattr(event, field, input[field])

    if 'start' in input:
        event.start = dateutil.parser.isoparse(input['start'])

    if 'end' in input:
        event.end = dateutil.parser.isoparse(input['end'])

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
            # TODO - check image access permissions
            # TODO - make image public if necessary
            event.image = kocherga.wagtail.models.CustomImage.objects.get(pk=input['image_id'])

    event.full_clean()
    event.save()
    models.Event.objects.notify_update()

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
    models.Event.objects.notify_update()

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
    models.Event.objects.notify_update()

    return {
        'ok': True,
        'event': event,
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
    models.Event.objects.notify_update()

    return {
        'ok': True,
        'event': event,
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
    models.Event.objects.notify_update()

    return {
        'ok': True,
        'event': event,
    }


@Mutation.field('eventSetZoomLink')
def eventSetZoomLink(_, info, input):
    event_id = input['event_id']
    zoom_link = input['zoom_link']

    event = models.Event.objects.get(uuid=event_id)
    event.set_zoom_link(zoom_link)
    models.Event.objects.notify_update()

    return {
        'ok': True,
        'event': event,
    }


@Mutation.field('eventGenerateZoomLink')
def eventGenerateZoomLink(_, info, input):
    event_id = input['event_id']

    event = models.Event.objects.get(uuid=event_id)
    event.generate_zoom_link()
    models.Event.objects.notify_update()

    return {
        'ok': True,
        'event': event,
    }


@Mutation.field('eventAddTag')
def eventAddTag(_, info, input):
    event = models.Event.objects.get(uuid=input['event_id'])

    event.add_tag(input['tag'])
    models.Event.objects.notify_update()

    return {
        'ok': True,
        'event': event,
    }


@Mutation.field('eventDeleteTag')
def eventDeleteTag(_, info, input):
    event = models.Event.objects.get(uuid=input['event_id'])

    event.delete_tag(input['tag'])
    models.Event.objects.notify_update()

    return {
        'ok': True,
        'event': event,
    }


@Mutation.field('eventSetImageFromUrl')
def eventSetImageFromUrl(_, info, input):
    event = models.Event.objects.get(uuid=input['event_id'])

    url = input['url']

    r = requests.get(url)
    r.raise_for_status()

    fh = BytesIO(r.content)
    event.add_image(fh)
    models.Event.objects.notify_update()

    return {
        'ok': True,
        'event': event,
    }


@Mutation.field('eventMove')
def eventMove(_, info, input):
    event = models.Event.objects.get(uuid=input['event_id'])
    start = dateutil.parser.isoparse(input['start'])

    event.move(start)
    models.Event.objects.notify_update()

    return {
        'ok': True,
        'event': event,
    }
