from datetime import datetime, timedelta

import graphene

from kocherga.django.schema_utils import require_staff, NNList

from .. import models
from . import objects, mutations


class Query:
    watchmenWatchmenAll = graphene.Field(
        NNList(objects.WatchmenWatchman),
        current=graphene.Boolean()
    )

    @require_staff
    def resolve_watchmenWatchmenAll(self, info, current=False):
        queryset = models.Watchman.objects.all()
        if current:
            queryset = queryset.filter(member__is_current=True).filter(priority__lt=3)

        return queryset

    watchmenGradesAll = NNList(objects.WatchmenGrade)

    @require_staff
    def resolve_watchmenGradesAll(self, info):
        return models.Grade.objects.all()

    watchmenShifts = graphene.Field(
        NNList(objects.WatchmenShift),
        from_date=graphene.String(),
        to_date=graphene.String(),
    )

    @require_staff
    def resolve_watchmenShifts(self, info, from_date=None, to_date=None):
        if from_date:
            from_date = datetime.strptime(from_date, '%Y-%m-%d').date()
        else:
            # start of last week
            from_date = datetime.today().date()
            from_date -= timedelta(days=from_date.weekday())

        if to_date:
            to_date = datetime.strptime(to_date, '%Y-%m-%d').date()
            if (to_date - from_date).days > 12 * 7:
                raise Exception("12 weeks max is allowed")
        else:
            to_date = from_date + timedelta(weeks=4) - timedelta(days=1)

        return models.Shift.objects.items_range(from_date, to_date)


class Mutation:
    watchmenCreateWatchman = mutations.WatchmenCreateWatchmanMutation.Field(required=True)
    watchmenUpdateShift = mutations.WatchmenUpdateShiftMutation.Field(required=True)
    watchmenSetWatchmanPriority = mutations.WatchmenSetWatchmanPriorityMutation.Field(required=True)
    watchmenSetWatchmanGrade = mutations.WatchmenSetWatchmanGradeMutation.Field(required=True)
