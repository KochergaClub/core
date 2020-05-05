from wagtail.contrib.modeladmin.options import ModelAdmin

from . import models


class ProjectPageAdmin(ModelAdmin):
    model = models.ProjectPage

    list_display = ('__str__', 'is_active', 'slug')
    list_filter = ('is_active',)


# not registered - registered in events group from kocherga.events.wagtail_hooks
