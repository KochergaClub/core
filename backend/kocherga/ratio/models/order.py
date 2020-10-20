from django.db import models
from kocherga.django.fields import ShortUUIDField

from .ticket import Ticket
from .payment import Payment
from kocherga.yandex_kassa.models import Payment as KassaPayment


class TicketArticle(models.Model):
    # prevents iterating over all articles by users
    uuid = ShortUUIDField()

    created = models.DateTimeField(auto_now_add=True)

    training = models.ForeignKey(
        'ratio.Training',
        on_delete=models.PROTECT,
        related_name='ticket_articles',
    )
    # TODO - active until / dynamic scheduling
    price = models.IntegerField('Стоимость')


class OrderManager(models.Manager):
    def create_order(self, **kwargs):
        article = kwargs['article']
        payment = KassaPayment.objects.create(
            amount=article.price,
            description=f'Участие в тренинге: {article.training.name}',
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

    article = models.ForeignKey(
        TicketArticle,
        on_delete=models.PROTECT,
        related_name='orders',
    )
    email = models.EmailField(db_index=True)
    first_name = models.CharField('Имя', max_length=255)
    last_name = models.CharField('Фамилия', max_length=255)
    city = models.CharField('Город', max_length=255)

    payer_email = models.EmailField(blank=True)
    payer_first_name = models.EmailField(blank=True)
    payer_last_name = models.EmailField(blank=True)

    def confirm(self):
        self.payment.update()
        if not self.payment.is_paid():
            raise Exception("Payment is not paid!")

        # TODO - use form/serializer instead
        ticket = Ticket(
            email=self.email,
            training=self.article.training,
            first_name=self.first_name,
            last_name=self.last_name,
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
        payment.save()

        return ticket
