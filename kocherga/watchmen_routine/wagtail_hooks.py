from wagtail.contrib.modeladmin.options import ModelAdmin

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

# These admins are wired to the group in kocherga.watchmen app, not here.
