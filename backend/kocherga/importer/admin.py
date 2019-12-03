from django.contrib import admin

from .models import State, LogEntry


@admin.register(State)
class StateAdmin(admin.ModelAdmin):
    list_display = ('name', 'last_dt', 'until_dt', 'last_exception')


@admin.register(LogEntry)
class LogEntryAdmin(admin.ModelAdmin):
    pass
