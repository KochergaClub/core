from wagtail.contrib.modeladmin.options import ModelAdmin, modeladmin_register

from . import models


class MemberAdmin(ModelAdmin):
    model = models.Member
    list_display = ('__str__', 'short_name', 'role', 'is_current')
    list_filter = ('is_current',)
    ordering = ('-is_current', 'role')


modeladmin_register(MemberAdmin)
