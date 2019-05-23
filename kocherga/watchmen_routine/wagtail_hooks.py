from wagtail.contrib.modeladmin.options import (
    ModelAdmin, ModelAdminGroup, modeladmin_register)

from . import models
from .admin import WeekdayFilter


class TaskAdmin(ModelAdmin):
    model = models.Task
    menu_label = 'Админские таски'
    menu_icon = 'list-ul'

    list_display = ('title', 'text', 'days_string')
    list_filter = (WeekdayFilter,)


class RewardImageAdmin(ModelAdmin):
    model = models.RewardImage
    menu_label = 'Добрые мемы'
    menu_icon = 'success'
    list_display = ('__str__', 'is_active')


class WatchmanGroup(ModelAdminGroup):
    menu_icon = 'group'
    menu_label = 'Админы'
    items = (TaskAdmin, RewardImageAdmin, )


modeladmin_register(WatchmanGroup)
