from typing import Optional
from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import user_perm

import channels.layers
from asgiref.sync import async_to_sync

import kocherga.staff.tools
from .. import models
from . import types

c = helpers.Collection()


@c.class_field
class watchmenCreateWatchman(helpers.BaseFieldWithInput):
    def resolve(self, _, info, params):
        kocherga.staff.tools.add_watchman(**params)
        return True

    permissions = [user_perm('watchmen.manage')]
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
class watchmenUpdateShift(helpers.BaseFieldWithInput):
    def resolve(self, _, info, params):
        # TODO - move to model
        (shift, _) = models.Shift.objects.get_or_create(
            date=params['date'], shift=params['shift'],
        )
        shift.is_night = params.get('is_night', False)
        if 'watchman_id' in params:
            shift.watchman = models.Watchman.objects.get(pk=params['watchman_id'])
        else:
            shift.watchman = None

        shift.full_clean()
        shift.save()

        async_to_sync(channels.layers.get_channel_layer().group_send)(
            'watchmen_schedule_group', {'type': 'notify.update'}
        )
        return shift

    permissions = [user_perm('watchmen.manage')]
    input = {
        'date': str,
        'shift': str,
        'watchman_id': 'ID',
        'is_night': Optional[bool],
    }
    input_argument_name = 'params'

    result = g.NN(types.WatchmenShift)


@c.class_field
class watchmenSetWatchmanPriority(helpers.BaseFieldWithInput):
    def resolve(self, _, info, params):
        watchman = models.Watchman.objects.get(pk=params['watchman_id'])
        watchman.priority = params['priority']
        watchman.full_clean()
        watchman.save()
        return True

    permissions = [user_perm('watchmen.manage')]
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

    permissions = [user_perm('watchmen.manage')]
    input = {
        'watchman_id': 'ID!',
        'grade_id': 'ID!',
    }
    input_argument_name = 'params'

    result = bool


mutations = c.as_dict()
