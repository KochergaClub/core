from datetime import datetime

from ariadne import QueryType

from .. import models

Query = QueryType()


@Query.field('watchmenWatchmenAll')
def resolve_watchmenWatchmenAll(
    _, info, current=False, currentStaff=False, currentRole=False
):
    queryset = models.Watchman.objects.all()

    # TODO - move to model's manager
    if currentStaff:
        queryset = queryset.filter(member__is_current=True)
    if currentRole:
        queryset = queryset.filter(priority__lt=3)

    return list(queryset)


@Query.field('watchmenGradesAll')
def resolve_watchmenGradesAll(self, info):
    return models.Grade.objects.all()


@Query.field('watchmenShifts')
def resolve_watchmenShifts(self, info, from_date, to_date):
    from_date = datetime.strptime(from_date, '%Y-%m-%d').date()
    to_date = datetime.strptime(to_date, '%Y-%m-%d').date()

    if (to_date - from_date).days > 12 * 7:
        raise Exception("12 weeks max is allowed")

    return models.Shift.objects.items_range(from_date, to_date)
