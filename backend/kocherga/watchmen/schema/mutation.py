from ariadne import MutationType

import channels.layers
from asgiref.sync import async_to_sync

import kocherga.staff.tools
from .. import models

Mutation = MutationType()


@Mutation.field('watchmenCreateWatchman')
def resolve_watchmenCreateWatchman(_, info, params):
    kocherga.staff.tools.add_watchman(**params)
    return True


@Mutation.field('watchmenUpdateShift')
def resolve_watchmenUpdateShift(_, info, params):
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
        'watchmen_schedule_group', {'type': 'notify.update',}
    )
    return shift


@Mutation.field('watchmenSetWatchmanPriority')
def resolve_watchmenSetWatchmanPriority(_, info, params):
    watchman = models.Watchman.objects.get(pk=params['watchman_id'])
    watchman.priority = params['priority']
    watchman.full_clean()
    watchman.save()
    return True


@Mutation.field('watchmenSetWatchmanGrade')
def resolve_watchmenSetWatchmanGrade(_, info, params):
    watchman = models.Watchman.objects.get(pk=params['watchman_id'])
    watchman.grade = models.Grade.objects.get(pk=params['grade_id'])
    watchman.full_clean()
    watchman.save()
    return True
