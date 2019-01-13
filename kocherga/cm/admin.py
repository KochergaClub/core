from django.contrib import admin

from .models import SubscriptionOrder, Order, Customer

admin.site.register(SubscriptionOrder)
admin.site.register(Order)
admin.site.register(Customer)
