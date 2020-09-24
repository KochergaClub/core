from wagtail.contrib.modeladmin.options import (
    ModelAdmin,
    ModelAdminGroup,
    modeladmin_register,
)

from . import models
import kocherga.projects.wagtail_hooks
import kocherga.telegram.wagtail_hooks


class GoogleCalendarAdmin(ModelAdmin):
    model = models.GoogleCalendar
    menu_label = 'Google-календари'
    menu_icon = 'list-ul'

    list_display = ('public_only', 'calendar_id')


class EventsGroup(ModelAdminGroup):
    menu_icon = 'group'
    menu_label = 'Сообщество'
    items = (
        GoogleCalendarAdmin,
        kocherga.projects.wagtail_hooks.ProjectPageAdmin,
        kocherga.telegram.wagtail_hooks.ChatAdmin,
    )


modeladmin_register(EventsGroup)
