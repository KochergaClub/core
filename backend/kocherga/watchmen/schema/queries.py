from typing import Optional
from datetime import datetime

from kocherga.graphql import g, helpers
from kocherga.graphql.decorators import staffonly

from .. import models
from . import types

c = helpers.Collection()


@c.class_field
class watchmenWatchmenAll(helpers.BaseField):
    @staffonly
    def resolve(self, _, info, currentStaff=False, currentRole=False):
        queryset = models.Watchman.objects.all()

        # TODO - move to model's manager
        if currentStaff:
            queryset = queryset.filter(member__is_current=True)
        if currentRole:
            queryset = queryset.filter(priority__lt=3)

        return list(queryset)

    args = {
        'currentStaff': Optional[bool],
        'currentRole': Optional[bool],
    }
    result = g.NNList(types.WatchmenWatchman)


@c.class_field
class watchmenGradesAll(helpers.BaseField):
    @staffonly
    def resolve(self, _, info):
        return models.Grade.objects.all()

    result = g.NNList(types.WatchmenGrade)


@c.class_field
class watchmenShifts(helpers.BaseField):
    @staffonly
    def resolve(self, _, info, from_date, to_date):
        from_date = datetime.strptime(from_date, '%Y-%m-%d').date()
        to_date = datetime.strptime(to_date, '%Y-%m-%d').date()

        if (to_date - from_date).days > 12 * 7:
            raise Exception("12 weeks max is allowed")

        return models.Shift.objects.items_range(from_date, to_date)

    args = {
        'from_date': str,
        'to_date': str,
    }
    result = g.NNList(types.WatchmenShift)


queries = c.as_dict()
