from wagtail.contrib.modeladmin.options import (
    ModelAdmin, ModelAdminGroup, modeladmin_register)
from . import models


class TrainingAdmin(ModelAdmin):
    model = models.Training
    # broken until we fix Training's pk


class RatioGroup(ModelAdminGroup):
    menu_icon = 'group'
    menu_label = 'Рацио'
    items = (TrainingAdmin,)


modeladmin_register(RatioGroup)
