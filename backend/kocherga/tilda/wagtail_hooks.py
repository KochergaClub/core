from wagtail.contrib.modeladmin.options import ModelAdmin, modeladmin_register

from . import models


class TildaPageAdmin(ModelAdmin):
    model = models.TildaPage

    list_display = ('title', 'path')


modeladmin_register(TildaPageAdmin)
