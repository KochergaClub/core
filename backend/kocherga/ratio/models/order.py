from django.db import models
from kocherga.django.fields import ShortUUIDField

from .ticket import Ticket
from .payment import Payment
from .ticket_type import TicketType
from kocherga.yandex_kassa.models import Payment as KassaPayment


class OrderManager(models.Manager):
    def create_order(self, **kwargs):
        ticket_type = kwargs['ticket_type']
        payment = KassaPayment.objects.create(
            amount=ticket_type.price,
            description=f'Участие в тренинге: {ticket_type.training.name}',
        )

        order = Order(
            **kwargs,
            payment=payment,
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

    # TODO:
    # promocode = ...

    ticket_type = models.ForeignKey(
        TicketType,
        on_delete=models.PROTECT,
        related_name='orders',
    )
    email = models.EmailField(db_index=True)
    first_name = models.CharField('Имя', max_length=255)
    last_name = models.CharField('Фамилия', max_length=255)
    city = models.CharField('Город', max_length=255)

    payer_email = models.EmailField(blank=True, default='')
    payer_first_name = models.EmailField(blank=True, default='')
    payer_last_name = models.EmailField(blank=True, default='')

    objects = OrderManager()

    class NotPaidError(Exception):
        pass

    class AlreadyFulfilledError(Exception):
        pass

    class TicketAlreadyExistsError(Exception):
        pass

    def confirm(self):
        self.payment.update()

        if not self.payment.is_paid() and not self.payment.is_waiting_for_capture():
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
            payment_amount=self.ticket_type.price,
        )
        ticket.full_clean()
        ticket.save()

        payment = Payment(
            ticket=ticket,
            amount=self.payment.amount,
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

        if self.payment.is_waiting_for_capture():
            self.payment.capture()

        return ticket
