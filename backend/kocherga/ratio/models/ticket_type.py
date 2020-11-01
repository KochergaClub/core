import datetime
from django.db import models
from django.db.models import Q
from django.core.validators import MinValueValidator

from kocherga.django.fields import ShortUUIDField

from .training import Training


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
        "Размер одноразового  промокода по E-mail'у",
        null=True,
        blank=True,
        validators=[MinValueValidator(1)],
    )

    objects = TicketTypeQuerySet.as_manager()

    def send_unique_promocode(self, email: str):
        from .promocode import Promocode

        if not self.discount_by_email:
            raise Exception("discount_by_email is not configured")

        promocode = Promocode.objects.generate_random(ticket_type=self)

        self.training.send_promocode_email(email, promocode)

        return promocode
