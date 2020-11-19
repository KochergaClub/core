import logging

logger = logging.getLogger(__name__)

import hashlib

from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models, transaction
from kocherga.django.managers import RelayQuerySetMixin

from .training import Training


class TicketQuerySet(models.QuerySet, RelayQuerySetMixin):
    def with_missing_payments(self):
        return self.annotate(payments_sum=models.Sum('payments__amount')).exclude(
            payments_sum=models.F('payment_amount')
        )

    def with_unfiscalized_checks(self):
        return self.filter(
            payments__fiscalization_status__in=['todo', 'in_progress']
        ).distinct()

    def without_notion_link(self):
        return self.filter(notion_link='').exclude(training__notion_created_email='')


class TicketManager(models.Manager):
    def get_queryset(self):
        return TicketQuerySet(self.model, using=self._db)

    def with_missing_payments(self):
        return self.get_queryset().with_missing_payments()

    def create(self, **kwargs):
        ticket = Ticket(**kwargs)
        ticket.full_clean()
        ticket.save()

        return ticket


class Ticket(models.Model):
    # TODO - deprecate, replace with ticket_type.training
    training = models.ForeignKey(
        Training,
        verbose_name='Тренинг',
        on_delete=models.PROTECT,
        related_name='tickets',
    )

    email = models.EmailField()
    first_name = models.CharField('Имя', max_length=255)
    last_name = models.CharField('Фамилия', max_length=255, null=True, blank=True)

    # deprecated
    registration_date = models.DateField(
        'Дата регистрации', auto_now_add=True, null=True
    )
    created = models.DateTimeField('Дата создания', auto_now_add=True)

    status = models.CharField(
        'Статус',
        max_length=40,
        default='normal',
        choices=(
            ('normal', 'Участник'),
            ('canceled', 'Отказ'),  # отказ, перенос, замена, неявка
        ),
    )
    ticket_class = models.CharField(
        'Тип билета',
        max_length=40,
        default='normal',
        choices=(
            ('normal', 'Обычный'),
            ('stipend', 'Стипендия'),
            ('staff', 'Стафф'),
            ('replacement', 'Замена (заменяет другого участника)'),
            ('carry-over', 'Перенос (с прошлого мероприятия)'),
            ('free-repeat', 'Бесплатный повтор'),
        ),
    )
    ticket_type = models.ForeignKey(
        'ratio.TicketType',
        null=True,
        blank=True,
        on_delete=models.PROTECT,
    )

    payment_amount = models.IntegerField('Размер оплаты')

    comment = models.TextField(blank=True)

    notion_link = models.URLField(blank=True)

    objects = TicketManager()

    class Meta:
        verbose_name = 'Участник'
        verbose_name_plural = 'Участники'
        unique_together = [['training', 'email']]
        ordering = ['-created']

    def __str__(self):
        return f'{self.training} - {self.email}'

    def clean(self):
        if self.ticket_type and self.ticket_type.training.pk != self.training.pk:
            raise ValidationError(
                {'ticket_type': ['Тип билета должен соответствовать тренингу']}
            )

    def save(self, *args, **kwargs):
        created = not bool(self.pk)
        super().save(*args, **kwargs)

        if created:
            from ..channels import send_new_ticket_email

            logger.info('scheduling new_ticket email on commit')
            transaction.on_commit(lambda: send_new_ticket_email(self))

    def set_notion_link(self, link: str):
        if self.notion_link:
            raise ValidationError({'notion_link': ['Ссылка на Notion уже заполнена']})
        if not self.training.notion_created_email:
            raise ValidationError(
                {'notion_link': ['Для этого тренинга не нужны Notion-ссылки в билетах']}
            )

        self.notion_link = link
        self.full_clean()
        self.training.send_notion_created_email(self)
        self.save()

    # UID is used for sharing anonymised data with third-party,
    # e.g. with academy crowd when we collect data from rationality tests.
    def uid(self):
        SALT = settings.KOCHERGA_MAILCHIMP_UID_SALT.encode()
        return hashlib.sha1(SALT + self.email.lower().encode()).hexdigest()[:10]
