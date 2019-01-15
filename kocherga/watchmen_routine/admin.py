from django.contrib import admin
from .models import Schedule, Task, RewardImage

class ScheduleInline(admin.TabularInline):
    model = Schedule

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'days_string')
    inlines = [
        ScheduleInline
    ]


@admin.register(RewardImage)
class RewardPictureAdmin(admin.ModelAdmin):
    pass
