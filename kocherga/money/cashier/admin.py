from django.contrib import admin

from .models import Cheque, CashierItem


@admin.register(CashierItem)
class CashierItemAdmin(admin.ModelAdmin):
    list_display = ('date', 'shift', 'watchman', 'total_income')


@admin.register(Cheque)
class ChequeAdmin(admin.ModelAdmin):
    list_display = ('id', 'whom', 'amount', 'is_paid')
