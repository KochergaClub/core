from django.contrib import admin
# from reversion_compare.admin import CompareVersionAdmin

from .models import Tag, EventPrototype, WeeklyDigest
# from .models import Event


class TagInline(admin.TabularInline):
    model = Tag


# @admin.register(Event)
# class EventAdmin(CompareVersionAdmin):
#     search_fields = ('title',)
#     inlines = [
#         TagInline,
#     ]


admin.site.register(EventPrototype)


@admin.register(WeeklyDigest)
class WeeklyDigestAdmin(admin.ModelAdmin):
    ordering = ('-start',)
