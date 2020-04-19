import logging
logger = logging.getLogger(__name__)

from ariadne import MutationType

from datetime import datetime
import wagtail.images.models

from kocherga.dateutils import TZ
import kocherga.projects.models
from ... import models

Mutation = MutationType()


@Mutation.field('eventPrototypeCreate')
def eventPrototypeCreate(_, info, input):
    prototype = models.EventPrototype.objects.create(
        title=input['title'],
        location=input.get('location', ''),
        weekday=input['weekday'],
        hour=input['hour'],
        minute=input['minute'],
        length=input['length'],
    )

    return {
        'ok': True,
        'prototype': prototype,
    }


@Mutation.field('eventPrototypeUpdate')
def eventPrototypeUpdate(_, info, input):
    prototype = models.EventPrototype.objects.get(pk=input['id'])
    logger.debug(input)

    for field in (
            'title',
            'summary',
            'description',
            'location',
            'timing_description_override',
            'active',
            'weekday',
            'hour',
            'minute',
            'timepad_category_code',
    ):
        if field in input:
            setattr(prototype, field, input[field])

    if 'project_slug' in input:
        if not input['project_slug']:
            prototype.project = None
        else:
            prototype.project = kocherga.projects.models.ProjectPage.objects.live().public().get(
                slug=input['project_slug']
            )

    if 'vk_group_name' in input:
        if not input['vk_group_name']:
            prototype.vk_group = None
        else:
            prototype.vk_group = input['vk_group_name']

    prototype.full_clean()
    prototype.save()

    return {
        'ok': True,
        'prototype': prototype,
    }


@Mutation.field('eventPrototypeCancelDate')
def eventPrototypeCancelDate(_, info, input):
    prototype = models.EventPrototype.objects.get(pk=input['id'])
    date_str = input['date']
    prototype.cancel_date(datetime.strptime(date_str, '%Y-%m-%d').date())
    prototype.save()

    return {
        'ok': True
    }


@Mutation.field('eventPrototypeNewEvent')
def eventPrototypeNewEvent(_, info, input):
    prototype = models.EventPrototype.objects.get(pk=input['id'])

    ts = input['ts']

    dt = datetime.fromtimestamp(ts, TZ)
    prototype.new_event(dt)

    return {
        'ok': True
    }


@Mutation.field('eventPrototypeAddTag')
def eventPrototypeAddTag(_, info, input):
    prototype = models.EventPrototype.objects.get(pk=input['id'])

    prototype.add_tag(input['tag'])

    return {
        'ok': True,
        'prototype': prototype,
    }


@Mutation.field('eventPrototypeDeleteTag')
def eventPrototypeDeleteTag(_, info, input):
    prototype = models.EventPrototype.objects.get(pk=input['id'])

    prototype.delete_tag(input['tag'])

    return {
        'ok': True,
        'prototype': prototype,
    }


@Mutation.field('eventPrototypeSetImage')
def eventPrototypeSetImage(_, info, input):
    prototype = models.EventPrototype.objects.get(pk=input['id'])
    logger.debug(input)

    image = wagtail.images.models.Image.objects.get(pk=input['image_id'])
    # TODO - implement image view permission and check for it

    prototype.image = image
    prototype.full_clean()
    prototype.save()

    return {
        'ok': True,
        'prototype': prototype,
    }
