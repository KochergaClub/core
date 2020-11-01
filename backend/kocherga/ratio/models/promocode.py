from __future__ import annotations
import string
import random
from string import ascii_uppercase, digits
from django.db import models
from django.core.validators import MinValueValidator, RegexValidator

from kocherga.django.managers import RelayQuerySetMixin

from .ticket_type import TicketType


class PromocodeQuerySet(RelayQuerySetMixin, models.QuerySet):
    pass


class PromocodeManager(models.Manager):
    def get_queryset(self):
        return PromocodeQuerySet(self.model, using=self._db)

    def create(self, **kwargs):
        obj = Promocode(**kwargs)
        obj.full_clean()
        obj.save()

        return obj

    def generate_random(self, ticket_type: TicketType) -> Promocode:
        LENGTH = 8
        code = ''.join(
            [
                random.choice(string.ascii_uppercase + string.digits)
                for i in range(LENGTH)
            ]
        )
        return self.create(
            ticket_type=ticket_type,
            code=code,
            uses_max=1,
            discount=ticket_type.discount_by_email,  # TODO - move to function args?
        )


class Promocode(models.Model):
    created = models.DateTimeField(auto_now_add=True, editable=False)

    code = models.CharField(
        'Промокод',
        max_length=100,
        validators=[
            RegexValidator(
                regex=r'^[a-zA-Z0-9]+$',
                message='Promocode must include only a-z or 0-9 characters',
            )
        ],
    )
    discount = models.IntegerField('Сумма скидки', validators=[MinValueValidator(1)])
    uses_max = models.IntegerField(
        'Максимальное количество использований',
        null=True,
        blank=True,
        validators=[MinValueValidator(1)],
    )
    uses_count = models.IntegerField(
        'Количество использований', default=0, editable=False
    )

    ticket_type = models.ForeignKey(
        TicketType, on_delete=models.CASCADE, related_name='promocodes'
    )

    objects = PromocodeManager()

    class Meta:
        unique_together = (('code', 'ticket_type'),)
        ordering = ['-created']

    def is_valid(self):
        if self.uses_max and self.uses_count >= self.uses_max:
            return False
        return True

    def apply(self) -> int:
        """Apply promocode and return the new price."""
        if not self.is_valid():
            raise Exception("Can't apply promocode - it's not valid")

        result = self.ticket_type.price - self.discount
        if result < 0:
            result = 0

        # TODO - there's a potential race condition here. But it's not very critical.
        self.uses_count += 1
        self.save()

        return result
