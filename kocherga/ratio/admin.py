from django.contrib import admin

from .models import Training, Ticket

@admin.register(Training)
class TrainingAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'date', 'tickets_count', 'total_income')

@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_filter = ('training', 'status', 'ticket_type')
    list_display = ('__str__', 'status', 'ticket_type', 'payment_amount', 'paid')
