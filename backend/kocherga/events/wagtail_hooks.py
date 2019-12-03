from wagtail.contrib.modeladmin.options import ModelAdmin, modeladmin_register

from . import models


# test
class GoogleCalendarAdmin(ModelAdmin):
    model = models.GoogleCalendar
    menu_label = 'Google-календари'
    menu_icon = 'list-ul'

    list_display = ('public_only', 'calendar_id')


modeladmin_register(GoogleCalendarAdmin)
