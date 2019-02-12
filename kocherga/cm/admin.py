from django.contrib import admin

from .models import SubscriptionOrder, Order, Customer

admin.site.register(SubscriptionOrder)
admin.site.register(Order)

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    search_fields = ('card_id', 'first_name', 'last_name')
