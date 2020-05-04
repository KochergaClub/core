from wagtail.contrib.modeladmin.options import ModelAdmin, modeladmin_register

from . import models


class ProjectPageAdmin(ModelAdmin):
    model = models.ProjectPage

    list_display = ('__str__', 'is_active')


modeladmin_register(ProjectPageAdmin)
