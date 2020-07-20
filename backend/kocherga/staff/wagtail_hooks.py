from wagtail.contrib.modeladmin.options import ModelAdmin, modeladmin_register

from . import models


class MemberAdmin(ModelAdmin):
    model = models.Member
    list_display = ('__str__', 'short_name', 'role', 'user__is_staff')
    list_filter = ('user__is_staff',)
    ordering = ('-user__is_staff', 'role')


modeladmin_register(MemberAdmin)
