from django.db import models

from .ticket_type import TicketType


class Promocode(models.Model):
    created = models.DateTimeField(auto_now_add=True, editable=False)

    code = models.CharField('Промокод', max_length=100)
    discount = models.IntegerField('Сумма скидки')
    single_use = models.BooleanField('Одноразовый', default=True)

    last_used = models.DateTimeField(
        'Последнее использование', null=True, editable=False
    )

    ticket_type = models.ForeignKey(TicketType, on_delete=models.CASCADE, related_name='promocodes')

    class Meta:
        unique_together = (('code', 'ticket_type'),)
