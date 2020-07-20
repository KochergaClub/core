from typing import Optional
from datetime import datetime

from kocherga.graphql import g, helpers
from kocherga.graphql.permissions import staffonly

from .. import models
from . import types

c = helpers.Collection()


@c.class_field
class watchmenWatchmenAll(helpers.BaseField):
    def resolve(self, _, info, currentStaff=False, currentRole=False):
        queryset = models.Watchman.objects.all()

        # TODO - move to model's manager
        if currentStaff:
            queryset = queryset.filter(member__user__is_current=True)
        if currentRole:
            queryset = queryset.filter(priority__lt=3)

        return list(queryset)

    permissions = [staffonly]
    args = {
        'currentStaff': Optional[bool],
        'currentRole': Optional[bool],
    }
    result = g.NNList(types.WatchmenWatchman)


@c.class_field
class watchmenGradesAll(helpers.BaseField):
    def resolve(self, _, info):
        return models.Grade.objects.all()

    permissions = [staffonly]
    result = g.NNList(types.WatchmenGrade)


@c.class_field
class watchmenShifts(helpers.BaseField):
    def resolve(self, _, info, from_date, to_date):
        from_date = datetime.strptime(from_date, '%Y-%m-%d').date()
        to_date = datetime.strptime(to_date, '%Y-%m-%d').date()

        if (to_date - from_date).days > 12 * 7:
            raise Exception("12 weeks max is allowed")

        return models.Shift.objects.items_range(from_date, to_date)

    permissions = [staffonly]
    args = {
        'from_date': str,
        'to_date': str,
    }
    result = g.NNList(types.WatchmenShift)


queries = c.as_dict()
