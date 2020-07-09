from kocherga.graphql import g, django_utils
from kocherga.staff.schema import types as staff_types
from .. import models

WatchmenGrade = django_utils.DjangoObjectType(
    'WatchmenGrade', model=models.Grade, db_fields=['id', 'code', 'multiplier']
)

WatchmenShift = django_utils.DjangoObjectType(
    'WatchmenShift',
    model=models.Shift,
    db_fields=['date', 'shift', 'is_night'],
    extra_fields=lambda: {'watchman': WatchmenWatchman},
)

WatchmenWatchman = django_utils.DjangoObjectType(
    'WatchmenWatchman',
    model=models.Watchman,
    db_fields=['id', 'priority'],
    extra_fields=lambda: {
        'member': g.NN(staff_types.StaffMember),
        'grade': WatchmenGrade,
    },
)
