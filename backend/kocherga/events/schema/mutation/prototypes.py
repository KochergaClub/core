import logging

logger = logging.getLogger(__name__)

from ariadne import MutationType

from datetime import datetime
import kocherga.wagtail.models

from kocherga.dateutils import TZ
import kocherga.projects.models
from ... import models

Mutation = MutationType()


def input_to_update_dict(input):
    result = {}
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
        'length',
        'timepad_category_code',
    ):
        if field in input:
            result[field] = input[field]

    if 'project_slug' in input:
        if not input['project_slug']:
            result['project'] = None
        else:
            result['project'] = (
                kocherga.projects.models.ProjectPage.objects.live()
                .public()
                .get(slug=input['project_slug'])
            )

    if 'vk_group_name' in input:
        if not input['vk_group_name']:
            result['vk_group'] = None
        else:
            result['vk_group'] = input['vk_group_name']

    return result


@Mutation.field('eventPrototypeCreate')
def eventPrototypeCreate(_, info, input):
    prototype = models.EventPrototype(**input_to_update_dict(input))
    prototype.full_clean()
    prototype.save()

    return {
        'ok': True,
        'prototype': prototype,
    }


@Mutation.field('eventPrototypeUpdate')
def eventPrototypeUpdate(_, info, input):
    prototype = models.EventPrototype.objects.get(pk=input['id'])
    logger.debug(input)

    for field, value in input_to_update_dict(input).items():
        setattr(prototype, field, value)

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

    return {'ok': True}


@Mutation.field('eventPrototypeNewEvent')
def eventPrototypeNewEvent(_, info, input):
    prototype = models.EventPrototype.objects.get(pk=input['id'])

    ts = input['ts']

    dt = datetime.fromtimestamp(ts, TZ)
    prototype.new_event(dt)

    return {'ok': True}


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

    image = kocherga.wagtail.models.CustomImage.objects.get(pk=input['image_id'])
    # TODO - implement image view permission and check for it

    prototype.image = image
    prototype.full_clean()
    prototype.save()

    return {
        'ok': True,
        'prototype': prototype,
    }
