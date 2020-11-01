import datetime
from django.db import models
from django.db.models import Q
from django.core.validators import MaxValueValidator, MinValueValidator

from kocherga.django.fields import ShortUUIDField

from .training import Training
from .promocode import Promocode


class TicketTypeQuerySet(models.QuerySet):
    def for_active_trainings(self):
        # TODO - flag `registration_open` on training object or something
        return self.filter(
            Q(training__date__gt=datetime.datetime.today())
            | Q(training__date__isnull=True)
        )


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

    discount_by_email = models.IntegerField(
        "Сумма скидки одноразового промокода по E-mail'у",
        default=0,
        validators=[MinValueValidator(0)],
    )
    discount_percent_by_email = models.IntegerField(
        "Процент скдики одноразового промокода по E-mail'у",
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
    )

    promocodes = models.ManyToManyField(
        Promocode, related_name='ticket_type_promocodes'
    )

    objects = TicketTypeQuerySet.as_manager()

    def send_unique_promocode(self, email: str):
        # FIXME - copypasted from Training
        if not self.discount_by_email and not self.discount_percent_by_email:
            raise Exception("discounts are not configured")

        promocode = Promocode.objects.generate_random(
            discount=self.discount_by_email,
            discount_percent=self.discount_percent_by_email,
            for_email=email,
        )
        self.promocodes.add(promocode)
        self.save()

        self.training.send_promocode_email(email, promocode)

        return promocode

    def check_promocode(self, code: str):
        # TODO - check if promocode is linked to training
        try:
            # check if promocode is linked to ticket type
            return self.promocodes.get(code=code)
        except Promocode.DoesNotExist:
            # check if promocode is linked to training
            return self.training.promocodes.get(code=code)
