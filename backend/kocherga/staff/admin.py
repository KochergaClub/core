from django.contrib import admin
from django.contrib.admin.models import LogEntry

from django.forms import ModelForm
from django.forms.widgets import TextInput

from .models import Member, AltEmail


class AltEmailInline(admin.TabularInline):
    model = AltEmail


class MemberAdminForm(ModelForm):
    class Meta:
        model = Member
        fields = '__all__'
        widgets = {
            'color': TextInput(attrs={'type': 'color'}),
        }


@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    form = MemberAdminForm

    list_display = ('__str__', 'short_name', 'role', 'is_current')
    list_filter = ('user__is_staff',)
    ordering = ('-user__is_staff', 'role')
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
