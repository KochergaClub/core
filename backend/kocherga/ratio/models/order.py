import logging

logger = logging.getLogger(__name__)

from typing import Optional
from django.db import models
from django.core.exceptions import ValidationError
from kocherga.django.fields import ShortUUIDField
from kocherga.django.managers import RelayQuerySetMixin

from .ticket import Ticket
from .payment import Payment
from .promocode import Promocode
from .ticket_type import TicketType
from kocherga.yandex_kassa.models import Payment as KassaPayment


class OrderQuerySet(models.QuerySet, RelayQuerySetMixin):
    pass


class OrderManager(models.Manager):
    def get_queryset(self):
        return OrderQuerySet(self.model, using=self._db)

    def relay_page(self, *args, **kwargs):
        return self.get_queryset().relay_page(*args, **kwargs)

    def create_order(self, **kwargs):
        ticket_type = kwargs['ticket_type']
        # Check that there's no ticket for this email and training.
        # Note that this still allows for race conditions - it's still possible to create two orders for the same email
        # if these orders are not confirmed. In this case we'll raise TicketAlreadyExistsError later.
        if (
            Ticket.objects.filter(
                email=kwargs['email'], training=ticket_type.training
            ).count()
            > 0
        ):
            raise ValidationError({'email': ['Этот email уже зарегистрирован']})

        promocode = kwargs.pop('promocode', '')
        promocode_obj: Optional[Promocode] = None
        if promocode != '':
            try:
                promocode_obj = Promocode.objects.get(
                    code=promocode, ticket_type=ticket_type
                )
            except Promocode.DoesNotExist:
                raise ValidationError({'promocode': ['Промокод не найден']})
            if not promocode_obj.is_valid():
                raise ValidationError({'promocode': ['Промокод недействителен']})

        price = ticket_type.price
        logger.info(price)
        if promocode_obj:
            price -= promocode_obj.discount
        logger.info(price)

        payment = KassaPayment.objects.create(
            amount=price,
            description=f'Участие в тренинге: {ticket_type.training.name}',
        )

        order = Order(
            **kwargs,
            payment=payment,
            promocode=promocode_obj,
        )
        order.full_clean()
        order.save()

        return order


class Order(models.Model):
    # We'll always use uuid on frontend to prevent navigation to /confirm-order/{order_id} for unknown orders.
    uuid = ShortUUIDField()

    created = models.DateTimeField(auto_now_add=True)

    payment = models.OneToOneField(
        KassaPayment,
        verbose_name='Платёж',
        on_delete=models.PROTECT,
        related_name='ratio_order',
    )
    fulfilled = models.BooleanField(default=False)

    ticket_type = models.ForeignKey(
        TicketType,
        on_delete=models.PROTECT,
        related_name='orders',
    )
    email = models.EmailField(db_index=True)
    first_name = models.CharField('Имя', max_length=255)
    last_name = models.CharField('Фамилия', max_length=255)
    city = models.CharField('Город', blank=True, max_length=255)

    payer_email = models.EmailField(blank=True, default='')
    payer_first_name = models.EmailField(blank=True, default='')
    payer_last_name = models.EmailField(blank=True, default='')

    promocode = models.ForeignKey(
        Promocode,
        on_delete=models.PROTECT,
        related_name='orders',
        blank=True,
        null=True,
    )

    objects = OrderManager()

    class NotPaidError(Exception):
        pass

    class AlreadyFulfilledError(Exception):
        pass

    class TicketAlreadyExistsError(Exception):
        pass

    # how much the order actually costs (not the same as ticket_type.price because of promocode)
    @property
    def price(self):
        return self.payment.amount

    def confirm(self):
        self.payment.update()

        if not self.payment.is_paid and not self.payment.waiting_for_capture:
            # FIXME - distinguish canceled due to timeout and not paid
            raise self.NotPaidError("Payment is not paid and not waiting for capture")
        if self.fulfilled:
            raise self.AlreadyFulfilledError("Already fulfilled")
        if Ticket.objects.filter(email=self.email).count():
            raise self.TicketAlreadyExistsError("Ticket already exists")

        # TODO - use form/serializer instead
        ticket = Ticket(
            training=self.ticket_type.training,
            email=self.email,
            first_name=self.first_name,
            last_name=self.last_name,
            payment_amount=self.payment.amount,
        )
        ticket.full_clean()
        ticket.save()

        payment = Payment(
            ticket=ticket,
            amount=self.price,
            payment_type='kassa',
            status='paid',
            fiscalization_status='todo',
            kassa_payment=self.payment,
        )
        payment.full_clean()
        payment.save()

        self.fulfilled = True
        self.full_clean()
        self.save()

        if self.payment.waiting_for_capture:
            self.payment.capture()

        return ticket
