import datetime
from django.db import models

from kocherga.django.fields import ShortUUIDField

from .training import Training


class TicketTypeQuerySet(models.QuerySet):
    def for_active_trainings(self):
        # TODO - flag `registration_open` on training object or something
        return self.filter(training__date__gt=datetime.datetime.today())


class TicketType(models.Model):
    # prevents iterating over all ticket types by users
    uuid = ShortUUIDField()

    created = models.DateTimeField(auto_now_add=True)

    training = models.ForeignKey(
        Training,
        on_delete=models.PROTECT,
        related_name='ticket_types',
    )
    # TODO - active until / dynamic scheduling
    price = models.IntegerField('Стоимость')
    name = models.CharField('Название', max_length=255)

    objects = TicketTypeQuerySet.as_manager()
