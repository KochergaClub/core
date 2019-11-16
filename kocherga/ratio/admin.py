from django.contrib import admin

from . import models


class ActivityInline(admin.TabularInline):
    model = models.Activity


class TicketInline(admin.TabularInline):
    model = models.Ticket


@admin.register(models.Training)
class TrainingAdmin(admin.ModelAdmin):
    list_display = ('slug', 'name', 'date', 'tickets_count', 'total_income')
    inlines = [
        TicketInline,
    ]


@admin.register(models.TrainingDay)
class TrainingDayAdmin(admin.ModelAdmin):
    list_display = ('date',)
    inlines = [
        ActivityInline,
    ]


@admin.register(models.Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_filter = ('training', 'status', 'ticket_type')
    list_display = ('__str__', 'status', 'ticket_type', 'payment_amount', 'paid')
    radio_fields = {
        'status': admin.VERTICAL,
        'ticket_type': admin.VERTICAL,
    }


@admin.register(models.Trainer)
class TrainerAdmin(admin.ModelAdmin):
    pass
