from django.contrib import admin

from .models import Payment, CashierItem


@admin.register(CashierItem)
class CashierItemAdmin(admin.ModelAdmin):
    list_display = ('date', 'shift', 'watchman', 'total_income')


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'whom', 'amount', 'is_redeemed')
