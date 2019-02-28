from django.contrib import admin

from .models import Training, Ticket, Trainer, Activity


class ActivityInline(admin.TabularInline):
    model = Activity


class TicketInline(admin.TabularInline):
    model = Ticket


@admin.register(Training)
class TrainingAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'date', 'tickets_count', 'total_income')
    inlines = [
        ActivityInline,
        TicketInline,
    ]


@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_filter = ('training', 'status', 'ticket_type')
    list_display = ('__str__', 'status', 'ticket_type', 'payment_amount', 'paid')
    radio_fields = {
        'status': admin.VERTICAL,
        'ticket_type': admin.VERTICAL,
    }


@admin.register(Trainer)
class TrainerAdmin(admin.ModelAdmin):
    pass
