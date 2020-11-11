import logging

logger = logging.getLogger(__name__)

from datetime import datetime
from typing import Optional

import kocherga.projects.models
import kocherga.wagtail.models
from kocherga.dateutils import TZ
from kocherga.graphql import g, helpers
from kocherga.graphql.basic_types import BasicResult

from ... import models, permissions
from ..types import EventsPrototype

c = helpers.Collection()


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


UpdateResult = g.NN(
    g.ObjectType(
        'EventPrototypeUpdateResult',
        g.fields({'ok': bool, 'prototype': g.NN(EventsPrototype)}),
    )
)


@c.class_field
class eventPrototypeCreate(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        prototype = models.EventPrototype(**input_to_update_dict(input))
        prototype.full_clean()
        prototype.save()
        return {
            'ok': True,
            'prototype': prototype,
        }

    permissions = [permissions.manage_events]
    input = {
        'title': str,
        'summary': Optional[str],
        'description': Optional[str],
        'timing_description_override': Optional[str],
        'location': Optional[str],
        'weekday': int,
        'hour': int,
        'minute': int,
        'length': int,
        'project_slug': Optional[str],
        'vk_group_name': Optional[str],
        'timepad_category_code': Optional[str],
    }

    result = UpdateResult


@c.class_field
class eventPrototypeUpdate(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
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

    permissions = [permissions.manage_events]
    # TODO - fix copy-paste, slightly different from eventPrototypeCreate input
    input = {
        'id': 'ID!',
        'active': Optional[bool],
        'title': Optional[str],
        'summary': Optional[str],
        'description': Optional[str],
        'timing_description_override': Optional[str],
        'location': Optional[str],
        'weekday': Optional[int],
        'hour': Optional[int],
        'minute': Optional[int],
        'length': Optional[int],
        'project_slug': Optional[str],
        'vk_group_name': Optional[str],
        'timepad_category_code': Optional[str],
    }

    result = UpdateResult


@c.class_field
class eventPrototypeCancelDate(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        prototype = models.EventPrototype.objects.get(pk=input['id'])
        date_str = input['date']
        prototype.cancel_date(datetime.strptime(date_str, '%Y-%m-%d').date())
        prototype.save()

        return {'ok': True}

    permissions = [permissions.manage_events]
    input = {
        'id': 'ID!',
        'date': str,
    }
    result = g.NN(BasicResult)


@c.class_field
class eventPrototypeNewEvent(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        prototype = models.EventPrototype.objects.get(pk=input['id'])

        ts = input['ts']

        dt = datetime.fromtimestamp(ts, TZ)
        prototype.new_event(dt)

        return {'ok': True}

    permissions = [permissions.manage_events]
    input = {
        'id': 'ID!',
        'ts': int,
    }
    result = g.NN(BasicResult)


@c.class_field
class eventPrototypeAddTag(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        prototype = models.EventPrototype.objects.get(pk=input['id'])

        prototype.add_tag(input['tag'])

        return {
            'ok': True,
            'prototype': prototype,
        }

    permissions = [permissions.manage_events]
    input = {
        'id': 'ID!',
        'tag': str,
    }
    result = UpdateResult


@c.class_field
class eventPrototypeDeleteTag(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        prototype = models.EventPrototype.objects.get(pk=input['id'])

        prototype.delete_tag(input['tag'])

        return {
            'ok': True,
            'prototype': prototype,
        }

    permissions = [permissions.manage_events]
    input = {
        'id': 'ID!',
        'tag': str,
    }
    result = UpdateResult


@c.class_field
class eventPrototypeSetImage(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
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

    permissions = [permissions.manage_events]
    input = {
        'id': 'ID!',
        'image_id': 'ID!',
    }
    result = UpdateResult


mutations = c.as_dict()
