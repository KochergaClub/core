from django.db import models

from kocherga.money.cashier import kkm

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

    def kkm_title(self):
        return (
            self.custom_kkm_title
            or f"Участие в мероприятии: {self.ticket.training.name}"
        )

    def fiscalize(self):
        if self.fiscalization_status != 'todo':
            raise Exception("fiscalization_status must be `todo`")

        self.fiscalization_status = 'in_progress'
        self.save()

        kkm.execute(
            kkm.getCheckRequest(
                kkm.OnlineCheck(
                    title=f"Участие в мероприятии: {self.ticket.training.name}",
                    signMethodCalculation=kkm.SignMethodCalculation.PrePayment100,
                    email=self.ticket.email,
                    sum=self.amount,
                )
            )
        )

        self.fiscalization_status = 'fiscalized'
        self.save()
