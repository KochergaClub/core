from django.contrib import admin

from . import models


@admin.register(models.Cohort)
class CohortAdmin(admin.ModelAdmin):
    pass
    # autocomplete_fields = ('event',)


@admin.register(models.Group)
class GroupAdmin(admin.ModelAdmin):
    pass
