from wagtail.contrib.modeladmin.options import ModelAdmin
from wagtailorderable.modeladmin.mixins import OrderableMixin

from . import models


class ChatAdmin(OrderableMixin, ModelAdmin):
    model = models.Chat
    menu_label = 'Telegram-чаты'
    menu_icon = 'list-ul'

    list_display = ('username', 'title')

    ordering = ['sort_order']
