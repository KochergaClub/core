from django.core.exceptions import ValidationError
from django.db import models
from kocherga.kkm.models import Controller as KkmController
from kocherga.kkm.models import kkmserver
from kocherga.yandex_kassa.models import Payment as KassaPayment

from .ticket import Ticket


class Payment(models.Model):
    ticket = models.ForeignKey(
        Ticket, related_name='payments', on_delete=models.PROTECT
    )

    amount = models.IntegerField('Размер оплаты')

    payment_type = models.CharField(
        'Вид оплаты',
        max_length=40,
        choices=(
            ('kassa', 'Яндекс.Касса'),
            ('kassa_invoice', 'Счёт Яндекс.Кассы'),
            ('transfer', 'Перевод'),
            ('cash', 'Наличные'),
            ('paypal', 'PayPal'),
            ('timepad', 'Timepad'),
            ('other', 'Другое'),
        ),
    )

    status = models.CharField(
        'Статус',
        max_length=40,
        default='todo',
        choices=(('todo', 'Не оплачен'), ('paid', 'Оплачен'), ('canceled', 'Отменён')),
    )

    fiscalization_status = models.CharField(
        'Статус фискального чека',
        max_length=40,
        choices=(
            ('todo', 'todo'),
            ('not_needed', 'not_needed'),
            ('in_progress', 'in_progress'),
            ('fiscalized', 'fiscalized'),
        ),
    )

    comment = models.TextField(blank=True)

    custom_kkm_title = models.CharField(
        'Кастомный заголовок для чека', blank=True, max_length=255
    )

    kassa_payment = models.OneToOneField(
        KassaPayment,
        on_delete=models.SET_NULL,
        related_name='ratio_payment',
        blank=True,
        null=True,
    )

    def clean(self):
        if self.kassa_payment and self.payment_type != 'kassa':
            raise ValidationError(
                'Only payments with `kassa` payment_type can refer to yandex_kassa.Payment'
            )

    def kkm_title(self):
        # TODO - take from ticket_type
        return (
            self.custom_kkm_title
            or f"Участие в мероприятии: {self.ticket.training.name}"
        )

    def fiscalize(self):
        if self.fiscalization_status != 'todo':
            raise Exception("fiscalization_status must be `todo`")

        self.fiscalization_status = 'in_progress'
        self.full_clean()
        self.save()

        KkmController.load().register_check(
            title=self.kkm_title(),
            # TODO - pass as argument
            sign_method_calculation=kkmserver.SignMethodCalculation.PRE_PAYMENT_100,
            email=self.ticket.email,
            sum=self.amount,
        )

        self.fiscalization_status = 'fiscalized'
        self.full_clean()
        self.save()
