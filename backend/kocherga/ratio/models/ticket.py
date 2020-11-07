import hashlib

from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.core.exceptions import ValidationError

from kocherga.django.managers import RelayQuerySetMixin

from .training import Training


class TicketQuerySet(models.QuerySet, RelayQuerySetMixin):
    def with_missing_payments(self):
        return self.annotate(payments_sum=models.Sum('payments__amount')).exclude(
            payments_sum=models.F('payment_amount')
        )

    def with_unfiscalized_checks(self):
        return self.filter(payments__fiscalization_status__in=['todo', 'in_progress'])


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

    # UID is used for sharing anonymised data with third-party,
    # e.g. with academy crowd when we collect data from rationality tests.
    def uid(self):
        SALT = settings.KOCHERGA_MAILCHIMP_UID_SALT.encode()
        return hashlib.sha1(SALT + self.email.lower().encode()).hexdigest()[:10]


@receiver(post_save, sender=Ticket)
def first_email(sender, instance, created, **kwargs):
    if not created:
        return

    # TODO - notify consumer for async
    instance.training.send_new_ticket_email(instance)
