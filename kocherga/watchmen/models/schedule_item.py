import logging
logger = logging.getLogger(__name__)

from collections import defaultdict
from datetime import timedelta
import datetime

from django.db import models

from kocherga.staff.models import Member

from .shift_type import ShiftType


class Manager(models.Manager):
    def items_range(self, from_date: datetime.date, to_date: datetime.date):
        items = self.filter(date__gte=from_date, date__lte=to_date)

        date2items = defaultdict(list)
        for item in items:
            date2items[item.date].append(item)

        d = from_date
        while d <= to_date:
            for shift in ShiftType.modern_shifts():
                if shift.name not in (item.shift for item in date2items[d]):
                    date2items[d].append(
                        ScheduleItem(
                            date=d,
                            shift=shift.name,
                            watchman_name='',
                        )
                    )
            d += timedelta(days=1)

        return sum(date2items.values(), [])


class ScheduleItem(models.Model):
    date = models.DateField()
    shift = models.CharField(
        max_length=20,
        choices=[
            (shift.name, shift.name) for shift in ShiftType
        ],
    )
    watchman_name = models.CharField(max_length=100, db_index=True)

    objects = Manager()

    def color(self):
        if not self.watchman_name:
            return '#ffffff'
        try:
            return Member.objects.get(short_name=self.watchman_name).color
        except Member.DoesNotExist:
            return '#ff0000'

    @property
    def shift_obj(self):
        return ShiftType[self.shift]

    class Meta:
        db_table = "watchmen_schedule"
        unique_together = (
            ('date', 'shift'),
        )
        permissions = (
            ('manage', 'Может управлять админским расписанием'),
        )
