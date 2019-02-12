from django.contrib import admin
from django.contrib.admin.models import LogEntry

from .models import Member, AltEmail

class AltEmailInline(admin.TabularInline):
    model = AltEmail

@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'role', 'is_current')
    list_filter = ('is_current',)
    ordering = ('-is_current', 'role')
    autocomplete_fields = ('cm_customer',)

    inlines = [
        AltEmailInline,
    ]

@admin.register(LogEntry)
class LogEntryAdmin(admin.ModelAdmin):
    list_display = [
        'action_time',
        'user',
        'content_type',
        'change_message',
    ]

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

    def has_delete_permission(self, request, obj=None):
        return False
