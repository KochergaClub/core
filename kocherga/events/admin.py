from django.contrib import admin
from reversion.admin import VersionAdmin

from .models import Event, EventPrototype, WeeklyDigest


@admin.register(Event)
class EventAdmin(VersionAdmin):
    search_fields = ('title',)


admin.site.register(EventPrototype)


@admin.register(WeeklyDigest)
class WeeklyDigestAdmin(admin.ModelAdmin):
    ordering = ('-start',)
