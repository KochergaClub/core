from django.contrib import admin

from .models import Event, EventPrototype, WeeklyDigest


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    search_fields = ('title',)


admin.site.register(EventPrototype)
admin.site.register(WeeklyDigest)
