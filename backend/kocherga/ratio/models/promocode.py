from __future__ import annotations
import string
import random
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, RegexValidator
from django.core.exceptions import ValidationError

from kocherga.django.managers import RelayQuerySetMixin


class PromocodeQuerySet(RelayQuerySetMixin, models.QuerySet):
    pass


class PromocodeManager(models.Manager):
    def get_queryset(self):
        return PromocodeQuerySet(self.model, using=self._db)

    def create(self, **kwargs):
        args = kwargs.copy()
        args['code'] = args['code'].upper()
        obj = Promocode(**args)
        obj.full_clean()
        obj.save()

        return obj

    def generate_random(
        self, discount: int, discount_percent: int, for_email: str
    ) -> Promocode:
        LENGTH = 8
        code = ''.join(
            [
                random.choice(string.ascii_uppercase + string.digits)
                for i in range(LENGTH)
            ]
        )
        return self.create(
            code=code,
            uses_max=1,
            discount=discount,
            discount_percent=discount_percent,
            for_email=for_email,
        )


class Promocode(models.Model):
    created = models.DateTimeField(auto_now_add=True, editable=False)

    code = models.CharField(
        'Промокод',
        max_length=100,
        validators=[
            RegexValidator(
                regex=r'^[A-Z0-9]+$',
                message='Promocode must include only A-Z or 0-9 characters',
            )
        ],
        unique=True,
    )
    discount = models.IntegerField(
        'Сумма скидки', default=0, validators=[MinValueValidator(0)]
    )
    discount_percent = models.IntegerField(
        'Процент скидки',
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
    )

    uses_max = models.IntegerField(
        'Максимальное количество использований',
        null=True,
        blank=True,
        validators=[MinValueValidator(1)],
    )
    uses_count = models.IntegerField(
        'Количество использований', default=0, editable=False
    )

    for_email = models.EmailField("Создан для E-mail'а", blank=True)

    objects = PromocodeManager()

    class Meta:
        ordering = ['-created']

    def clean(self):
        if self.discount and self.discount_percent:
            raise ValidationError(
                'Only one of `discount` and `discount_percent` must be non-zero'
            )
        if not self.discount and not self.discount_percent:
            raise ValidationError(
                'One of `discount` and `discount_percent` must be non-zero'
            )

    def is_valid(self):
        if self.uses_max and self.uses_count >= self.uses_max:
            return False
        return True

    def check_apply(self, base_price: int) -> int:
        if not self.is_valid():
            raise Exception("Can't apply promocode - it's not valid")

        result = base_price

        # rounding down, 999 -> 799
        result = int(result * (1 - self.discount_percent / 100))
        result -= self.discount

        if result < 0:
            result = 0

        return result

    def apply(self, base_price: int) -> int:
        """Apply promocode and register that promocode wat applied."""
        result = self.check_apply(base_price)

        # TODO - there's a potential race condition here. But it's not very critical.
        self.uses_count += 1
        self.save()

        return result
