import kocherga.tilda.wagtail_hooks

from wagtail.contrib.modeladmin.options import (
    ModelAdmin,
    ModelAdminGroup,
    modeladmin_register,
)

from . import models


class SpecialOfferAdmin(ModelAdmin):
    model = models.SpecialOffer


class WebsiteGroup(ModelAdminGroup):
    menu_icon = 'group'
    menu_label = 'Сайт'
    items = (
        SpecialOfferAdmin,
        kocherga.tilda.wagtail_hooks.TildaPageAdmin,
    )


modeladmin_register(WebsiteGroup)
