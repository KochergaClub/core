from wagtail.contrib.modeladmin.options import (
    ModelAdmin, ModelAdminGroup, modeladmin_register)
from . import models


class TaskAdmin(ModelAdmin):
    model = models.Task
    menu_label = 'Админские таски'
    menu_icon = 'list-ul'


class RewardImageAdmin(ModelAdmin):
    model = models.RewardImage
    menu_label = 'Добрые мемы'
    menu_icon = 'success'


class WatchmanGroup(ModelAdminGroup):
    menu_icon = 'group'
    menu_label = 'Админы'
    items = (TaskAdmin, RewardImageAdmin, )


modeladmin_register(WatchmanGroup)
