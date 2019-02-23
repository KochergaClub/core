from django.contrib import admin

from . import models

class UserInline(admin.TabularInline):
    model = models.User

@admin.register(models.Cohort)
class CohortAdmin(admin.ModelAdmin):
    autocomplete_fields = ('event',)
    inlines = [
        UserInline
    ]
