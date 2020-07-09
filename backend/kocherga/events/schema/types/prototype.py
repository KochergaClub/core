from typing import Optional
from datetime import datetime

from kocherga.dateutils import TZ
from kocherga.graphql import g, django_utils
from kocherga.graphql.decorators import staffonly
from kocherga.wagtail import graphql_utils as wagtail_utils

from kocherga.projects.schema.types import ProjectPage

from ... import models

from .event import EventsEvent
from .announcements import VkGroup, TimepadCategory

EventsPrototype = g.ObjectType(
    'EventsPrototype',
    lambda: g.fields(
        {
            'id': g.Field(g.NN(g.ID), resolve=lambda obj, info: obj.prototype_id),
            **django_utils.model_fields(
                models.EventPrototype,
                [
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
                ],
            ),
            'project': g.Field(ProjectPage),
            'tags': tags_field(),
            'image': wagtail_utils.image_rendition_field(
                models.EventPrototype, 'image'
            ),
            'suggested_dates': suggested_dates_field(),
            'instances': instances_field(),
            'vk_group': vk_group_field(),
            'timepad_category': timepad_category_field(),
        }
    ),
)


# suggested_dates(until_ts: Int, limit: Int!): [String!]!
def suggested_dates_field():
    def resolve(obj, info, limit, until_ts=None):
        if until_ts:
            until_ts = datetime.fromtimestamp(until_ts, tz=TZ)
        return obj.suggested_dates(until=until_ts, limit=limit)

    return g.Field(
        g.NNList(g.String),
        args=g.arguments({'until_ts': Optional[int], 'limit': int}),
        resolve=resolve,
    )


# instances(limit: Int): [EventsEvent!]! @staffonly
def instances_field():
    @staffonly
    def resolve(obj, info, limit=None):
        return obj.instances(limit=limit)

    return g.Field(
        g.NNList(EventsEvent),
        args=g.arguments({'limit': Optional[int]}),
        resolve=resolve,
    )


def tags_field():
    def resolve(obj, info):
        return obj.tag_names()

    return g.Field(g.NNList(g.String), resolve=resolve)


def vk_group_field():
    def resolve(obj, info):
        if not obj.vk_group:
            return None
        return {
            'name': obj.vk_group,
        }

    return g.Field(VkGroup, resolve=resolve)


def timepad_category_field():
    def resolve(obj, info):
        return obj.timepad_category

    return g.Field(TimepadCategory, resolve=resolve)
