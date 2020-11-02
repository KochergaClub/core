from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.core.mail import send_mail
from django.db.models.signals import post_save
from django.template.loader import render_to_string
from django.core.exceptions import ValidationError

import markdown
from html2text import html2text
import hashlib

from .training import Training


class TicketManager(models.Manager):
    def create(self, **kwargs):
        ticket = Ticket(**kwargs)
        ticket.full_clean()
        ticket.save()

        return ticket


class Ticket(models.Model):
    training = models.ForeignKey(
        Training,
        verbose_name='Тренинг',
        on_delete=models.PROTECT,
        related_name='tickets',
    )

    email = models.EmailField()
    first_name = models.CharField('Имя', max_length=255)
    last_name = models.CharField('Фамилия', max_length=255, null=True, blank=True)

    registration_date = models.DateField(
        'Дата регистрации', auto_now_add=True, null=True
    )

    status = models.CharField(
        'Статус',
        max_length=40,
        default='normal',
        choices=(
            ('normal', 'Участник'),
            ('canceled', 'Отказ'),  # отказ, перенос, замена, неявка
        ),
    )
    ticket_type = models.CharField(
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

    payment_amount = models.IntegerField('Размер оплаты')

    comment = models.TextField(blank=True)

    notion_link = models.URLField(blank=True)

    class Meta:
        verbose_name = 'Участник'
        verbose_name_plural = 'Участники'
        unique_together = [['training', 'email']]
        ordering = ['registration_date']

    def __str__(self):
        return f'{self.training} - {self.email}'

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
    html_message = markdown.markdown(
        render_to_string(
            'ratio/email/new_ticket.md',
            {"ticket": instance, "training": instance.training},
        )
    )
    send_mail(
        subject='Регистрация на событие',
        from_email='Кочерга <workshop@kocherga-club.ru>',
        html_message=html_message,
        message=html2text(html_message),
        recipient_list=[instance.email],
    )
