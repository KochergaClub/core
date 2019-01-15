from django.contrib import admin
from .models import Schedule, Task

class ScheduleInline(admin.TabularInline):
    model = Schedule

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'days_string')
    inlines = [
        ScheduleInline
    ]
