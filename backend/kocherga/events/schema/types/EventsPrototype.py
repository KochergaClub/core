from datetime import datetime

from kocherga.dateutils import TZ
from kocherga.graphql.types import DjangoObjectType

from ...import models

EventsPrototype = DjangoObjectType('EventsPrototype', models.EventPrototype)

EventsPrototype.set_alias('id', 'prototype_id')
EventsPrototype.image_field('image')


@EventsPrototype.field('suggested_dates')
def resolve_suggested_dates(obj, info, limit, until_ts=None):
    if until_ts:
        until_ts = datetime.fromtimestamp(until_ts, tz=TZ)
    return obj.suggested_dates(until=until_ts, limit=limit)


@EventsPrototype.field('instances')
def resolve_instances(obj, info, limit=None):
    return obj.instances(limit=limit)


@EventsPrototype.field('tags')
def resolve_tags(obj, info):
    return obj.tag_names()


@EventsPrototype.field('vk_group')
def resolve_vk_group(obj, info):
    if not obj.vk_group:
        return None
    return {
        'name': obj.vk_group,  # might become foreign key some day
    }


@EventsPrototype.field('timepad_category')
def resolve_timepad_category(obj, info):
    return obj.timepad_category
