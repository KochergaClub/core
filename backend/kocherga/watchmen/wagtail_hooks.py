from wagtail.contrib.modeladmin.options import (
    ModelAdmin,
    ModelAdminGroup,
    modeladmin_register,
)

from . import models
from kocherga.watchmen_routine.wagtail_hooks import TaskAdmin, RewardImageAdmin


class GradeAdmin(ModelAdmin):
    model = models.Grade
    menu_label = 'Грейды'
    menu_icon = 'arrows-up-down'
    list_display = ('__str__', 'multiplier')


class WatchmanGroup(ModelAdminGroup):
    menu_icon = 'group'
    menu_label = 'Админы'
    items = (
        TaskAdmin,
        RewardImageAdmin,
        GradeAdmin,
    )


modeladmin_register(WatchmanGroup)
