from django.contrib import admin

from . import models


class UserInline(admin.TabularInline):
    model = models.User
    autocomplete_fields = ('user',)


@admin.register(models.Cohort)
class CohortAdmin(admin.ModelAdmin):
    autocomplete_fields = ('event',)
    inlines = [
        UserInline
    ]


@admin.register(models.Group)
class GroupAdmin(admin.ModelAdmin):
    pass
