import logging

import kocherga.django.schema.types
from django.core.exceptions import ValidationError
from kocherga.django.errors import BoxedError

logger = logging.getLogger(__name__)

from typing import Optional

import channels.layers
import kocherga.staff.tools
from django.db import transaction
from kocherga.graphql import helpers

from .. import channels, models, permissions
from . import types

c = helpers.Collection()


@c.class_field
class watchmenCreateWatchman(helpers.BaseFieldWithInput):
    def resolve(self, _, info, params):
        kocherga.staff.tools.add_watchman(**params)
        return True

    permissions = [permissions.manage_watchmen]
    input = {
        'email': str,
        'short_name': str,
        'full_name': str,
        'password': str,
        'vk': Optional[str],
        'gender': str,
        'skip_wiki': Optional[bool],
        'skip_cm_customer': Optional[bool],
        'skip_cm_user': Optional[bool],
    }
    input_argument_name = 'params'

    result = bool


@c.class_field
class watchmenUpdateShift(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    permissions = [permissions.manage_watchmen]
    input = {
        'date': str,
        'shift': str,
        'watchman_id': 'ID',
        'is_night': Optional[bool],
    }
    input_argument_name = 'params'

    result_types = {
        models.Shift: types.WatchmenShift,
        BoxedError: kocherga.django.schema.types.ValidationError,
    }

    def resolve(self, _, info, params):
        # TODO - move to model
        (shift, _) = models.Shift.objects.get_or_create(
            date=params['date'],
            shift=params['shift'],
        )
        shift.is_night = params.get('is_night', False)
        if 'watchman_id' in params:
            shift.watchman = models.Watchman.objects.get(pk=params['watchman_id'])
        else:
            shift.watchman = None

        try:
            shift.full_clean()
        except ValidationError as e:
            return BoxedError(e)

        shift.save()

        def on_commit():
            # can't broadcast empty dict, channels-redis complains
            channels.watchmen_updates_group.broadcast({'updated': True})

        transaction.on_commit(on_commit)
        return shift


@c.class_field
class watchmenSetWatchmanPriority(helpers.BaseFieldWithInput):
    def resolve(self, _, info, params):
        watchman = models.Watchman.objects.get(pk=params['watchman_id'])
        watchman.priority = params['priority']
        watchman.full_clean()
        watchman.save()
        return True

    permissions = [permissions.manage_watchmen]
    input = {
        'watchman_id': 'ID!',
        'priority': int,
    }
    input_argument_name = 'params'

    result = bool


@c.class_field
class watchmenSetWatchmanGrade(helpers.BaseFieldWithInput):
    def resolve(self, _, info, params):
        watchman = models.Watchman.objects.get(pk=params['watchman_id'])
        watchman.grade = models.Grade.objects.get(pk=params['grade_id'])
        watchman.full_clean()
        watchman.save()
        return True

    permissions = [permissions.manage_watchmen]
    input = {
        'watchman_id': 'ID!',
        'grade_id': 'ID!',
    }
    input_argument_name = 'params'

    result = bool


mutations = c.as_dict()
