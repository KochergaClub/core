from django.contrib import admin

import kocherga.dateutils

from .models import Schedule, Task, RewardImage

class ScheduleInline(admin.TabularInline):
    model = Schedule


class WeekdayFilter(admin.SimpleListFilter):
    title = 'День недели'

    parameter_name = 'weekday'

    def lookups(self, request, model_admin):
        """
        Returns a list of tuples. The first element in each
        tuple is the coded value for the option that will
        appear in the URL query. The second element is the
        human-readable name for the option that will appear
        in the right sidebar.
        """
        return (
            (str(i+1), kocherga.dateutils.WEEKDAY_NAMES[i].capitalize())
            for i in range(7)
        )

    def queryset(self, request, queryset):
        """
        Returns the filtered queryset based on the value
        provided in the query string and retrievable via
        `self.value()`.
        """
        if self.value() is None:
            return

        weekday = int(self.value()) - 1
        return queryset.filter(schedules__weekday=weekday)


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'days_string')
    list_filter = (WeekdayFilter,)
    inlines = [
        ScheduleInline
    ]


@admin.register(RewardImage)
class RewardPictureAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'is_active')
