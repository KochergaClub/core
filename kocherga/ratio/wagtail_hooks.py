from wagtail.contrib.modeladmin.options import (
    ModelAdmin, ModelAdminGroup, modeladmin_register)
from . import models


class TrainingAdmin(ModelAdmin):
    model = models.Training
    # broken until we fix Training's pk


class SectionAdmin(ModelAdmin):
    model = models.SectionPage
    list_display = ('__str__', 'status')
    list_filter = ('status',)


class NotebookAdmin(ModelAdmin):
    model = models.NotebookPage
    list_display = ('__str__',)


class RatioGroup(ModelAdminGroup):
    menu_icon = 'group'
    menu_label = 'Рацио'
    items = (TrainingAdmin, SectionAdmin, NotebookAdmin,)


modeladmin_register(RatioGroup)
