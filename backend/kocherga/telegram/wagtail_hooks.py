from wagtail.contrib.modeladmin.options import ModelAdmin

from . import models


class ChatAdmin(ModelAdmin):
    model = models.Chat
    menu_label = 'Telegram-чаты'
    menu_icon = 'list-ul'

    list_display = ('username', 'title')
