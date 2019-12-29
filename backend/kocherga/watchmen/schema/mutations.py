import graphene

import channels.layers
from asgiref.sync import async_to_sync

from kocherga.django.schema_utils import Ok, require_permission

import kocherga.staff.tools

from . import objects
from .. import models


class WatchmenCreateWatchmanInput(graphene.InputObjectType):
    email = graphene.String(required=True)
    short_name = graphene.String(required=True)
    full_name = graphene.String(required=True)
    password = graphene.String(required=True)
    vk = graphene.String()
    gender = graphene.String(required=True)
    skip_wiki = graphene.Boolean()
    skip_cm_customer = graphene.Boolean()
    skip_cm_user = graphene.Boolean()


class WatchmenCreateWatchmanMutation(graphene.Mutation):
    class Arguments:
        params = WatchmenCreateWatchmanInput(required=True)

    Output = Ok

    @require_permission('watchmen.manage')
    def mutate(self, info, params):
        kocherga.staff.tools.add_watchman(
            short_name=params.short_name,
            full_name=params.full_name,
            email=params.email,
            password=params.password,
            vk=params.vk,
            gender=params.gender,
            skip_wiki=params.skip_wiki,
            skip_cm_customer=params.skip_cm_customer,
            skip_cm_user=params.skip_cm_user,
        )
        return Ok(ok=True)


class WatchmenUpdateShiftInput(graphene.InputObjectType):
    date = graphene.String(required=True)
    shift = graphene.String(required=True)
    watchman_id = graphene.ID()
    is_night = graphene.Boolean()


class WatchmenUpdateShiftMutation(graphene.Mutation):
    class Arguments:
        params = WatchmenUpdateShiftInput(required=True)

    Output = objects.WatchmenShift

    @require_permission('watchmen.manage')
    def mutate(self, info, params):
        (shift, _) = models.Shift.objects.get_or_create(
            date=params.date,
            shift=params.shift,
        )
        shift.is_night = params.is_night
        if params.watchman_id:
            shift.watchman = models.Watchman.objects.get(pk=params.watchman_id)
        else:
            shift.watchman = None

        shift.full_clean()
        shift.save()

        async_to_sync(channels.layers.get_channel_layer().group_send)(
            'watchmen_schedule_group', {
                'type': 'notify.update',
            }
        )
        return shift


class WatchmenSetWatchmanPriorityInput(graphene.InputObjectType):
    watchman_id = graphene.ID(required=True)
    priority = graphene.Int(required=True)


class WatchmenSetWatchmanPriorityMutation(graphene.Mutation):
    class Arguments:
        params = WatchmenSetWatchmanPriorityInput(required=True)

    Output = Ok

    @require_permission('watchmen.manage')
    def mutate(self, info, params):
        watchman = models.Watchman.objects.get(pk=params.watchman_id)
        watchman.priority = params.priority
        watchman.full_clean()
        watchman.save()
        return Ok(ok=True)


class WatchmenSetWatchmanGradeInput(graphene.InputObjectType):
    watchman_id = graphene.ID(required=True)
    grade_id = graphene.ID(required=True)


class WatchmenSetWatchmanGradeMutation(graphene.Mutation):
    class Arguments:
        params = WatchmenSetWatchmanGradeInput(required=True)

    Output = Ok

    @require_permission('watchmen.manage')
    def mutate(self, info, params):
        watchman = models.Watchman.objects.get(pk=params.watchman_id)
        watchman.grade = models.Grade.objects.get(pk=params.grade_id)
        watchman.full_clean()
        watchman.save()
        return Ok(ok=True)
