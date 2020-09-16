from wagtail.contrib.modeladmin.options import ModelAdmin

from . import models


class TildaPageAdmin(ModelAdmin):
    model = models.TildaPage

    list_display = ('title', 'path')


# not registered - registered in website group from kocherga.pages.wagtail_hooks
