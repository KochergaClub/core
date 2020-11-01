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
    single_use = models.BooleanField('Одноразовый', default=True)

    last_used = models.DateTimeField(
        'Последнее использование', null=True, editable=False
    )

    ticket_type = models.ForeignKey(
        TicketType, on_delete=models.CASCADE, related_name='promocodes'
    )

    objects = PromocodeManager()

    class Meta:
        unique_together = (('code', 'ticket_type'),)

    def is_valid(self):
        return not self.single_use or not self.last_used
