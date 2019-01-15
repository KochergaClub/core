from django.contrib import admin

from .models import Member, AltEmail

class AltEmailInline(admin.TabularInline):
    model = AltEmail

@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'role', 'is_current')
    inlines = [
        AltEmailInline,
    ]
