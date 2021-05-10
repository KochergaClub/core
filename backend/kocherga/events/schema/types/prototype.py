from datetime import datetime
from typing import Optional

from kocherga.dateutils import TZ
from kocherga.graphql import django_utils, g
from kocherga.graphql.permissions import check_permissions
from kocherga.projects.schema.types import ProjectPage
from kocherga.wagtail import graphql_utils as wagtail_utils

from ... import models, permissions
from .announcements import TimepadCategory, VkGroup
from .event import Event

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


def suggested_dates_field():
    def resolve(obj, info, limit, until_ts=None, from_date=None, to_date=None):
        from_date_parsed = None
        to_date_parsed = None
        if from_date:
            from_date_parsed = datetime.strptime(from_date, '%Y-%m-%d').date()
        if to_date:
            to_date_parsed = datetime.strptime(to_date, '%Y-%m-%d').date()
        elif until_ts:
            to_date_parsed = datetime.fromtimestamp(until_ts, tz=TZ).date()
        return obj.suggested_dates(
            from_date=from_date_parsed, to_date=to_date_parsed, limit=limit
        )

    return g.Field(
        g.NNList(g.String),
        args=g.arguments(
            {
                'limit': int,
                'from_date': Optional[str],
                'to_date': Optional[str],
                'until_ts': Optional[int],  # deprecated
            }
        ),
        resolve=resolve,
    )


def instances_field():
    @check_permissions([permissions.manage_events])
    def resolve(obj, info, limit=None):
        return obj.instances(limit=limit)

    return g.Field(
        g.NNList(Event),
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
