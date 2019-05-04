from wagtail.contrib.modeladmin.options import (
    ModelAdmin, ModelAdminGroup, modeladmin_register)
from . import models


class TaskAdmin(ModelAdmin):
    model = models.Task
    menu_label = 'Админские таски'
    menu_icon = 'list-ul'
    add_to_settings_menu = False  # or True to add your model to the Settings sub-menu
    exclude_from_explorer = False # or True to exclude pages of this type from Wagtail's explorer view
    # list_display = ('title', 'author')
    # list_filter = ('author',)
    # search_fields = ('title', 'author')


class RewardImageAdmin(ModelAdmin):
    model = models.RewardImage
    menu_label = 'Добрые мемы'
    menu_icon = 'success'


class WatchmanGroup(ModelAdminGroup):
    menu_icon = 'group'
    menu_label = 'Админы'
    items = (TaskAdmin, RewardImageAdmin, )

modeladmin_register(WatchmanGroup)
