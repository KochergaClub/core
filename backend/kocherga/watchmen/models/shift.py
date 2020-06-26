import logging

logger = logging.getLogger(__name__)

from collections import defaultdict
from datetime import timedelta
import datetime

from django.core.exceptions import ValidationError
from django.db import models

from .shift_type import ShiftType
from .watchman import Watchman


class Manager(models.Manager):
    def items_range(self, from_date: datetime.date, to_date: datetime.date):
        items = self.filter(date__gte=from_date, date__lte=to_date)

        date2items = defaultdict(list)
        for item in items:
            date2items[item.date].append(item)

        d = from_date
        while d <= to_date:
            for shift_type in ShiftType.modern_shifts():
                if shift_type.name not in (item.shift for item in date2items[d]):
                    date2items[d].append(Shift(date=d, shift=shift_type.name,))
            d += timedelta(days=1)

        return sum(date2items.values(), [])


class Shift(models.Model):
    date = models.DateField(editable=False, db_index=True)

    # TODO - rename to shift_type or shift_type_name
    shift = models.CharField(
        max_length=20,
        choices=[(shift_type.name, shift_type.name) for shift_type in ShiftType],
        editable=False,
    )
    watchman = models.ForeignKey(
        Watchman, null=True, blank=True, on_delete=models.CASCADE, related_name='+'
    )
    is_night = models.BooleanField(default=False)

    objects = Manager()

    def color(self):
        if not self.watchman:
            return '#ffffff'
        return self.watchman.color

    @property
    def shift_obj(self):
        return ShiftType[self.shift]

    def clean(self):
        if self.watchman and self.is_night:
            raise ValidationError("watchman can't be set when is_night is set")

    class Meta:
        db_table = "watchmen_schedule"
        unique_together = (('date', 'shift'),)
        permissions = (('manage', 'Может управлять админским расписанием'),)
