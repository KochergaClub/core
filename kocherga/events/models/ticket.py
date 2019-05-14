from django.db import models
from django.conf import settings


class Ticket(models.Model):
    event = models.ForeignKey(
        'Event',
        on_delete=models.PROTECT,
        related_name='tickets',
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)

    class Meta:
        unique_together = (
            ('event', 'user'),
        )
        permissions = (
            ('view_tickets', 'Может смотреть билеты'),
        )
