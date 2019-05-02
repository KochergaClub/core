from django.db import models
from django.conf import settings

import hashlib

from .training import Training


class Ticket(models.Model):
    training = models.ForeignKey(Training, verbose_name='Тренинг', on_delete=models.PROTECT, related_name='tickets')

    email = models.EmailField()
    first_name = models.CharField('Имя', max_length=255)
    last_name = models.CharField('Фамилия', max_length=255, null=True, blank=True)

    registration_date = models.DateField('Дата регистрации', null=True)
    status = models.CharField('Статус', max_length=40, default='normal', choices=(
        ('normal', 'Участник'),
        ('canceled', 'Отказ'),  # отказ, перенос, замена, неявка
    ))
    ticket_type = models.CharField('Тип билета', max_length=40, choices=(
        ('normal', 'Обычный'),
        ('stipend', 'Стипендия'),
        ('staff', 'Стафф'),
        ('replacement', 'Замена (заменяет другого участника)'),
        ('carry-over', 'Перенос (с прошлого мероприятия)'),
    ))

    payment_type = models.CharField('Вид оплаты', max_length=40, choices=(
        ('none', '-'),
        ('timepad', 'Timepad'),
        ('website', 'Сайт'),
        ('crowdfunding', 'Краудфандинг'),
        ('cash', 'Нал'),
        ('invoice', 'Счёт'),
        ('transfer', 'Перевод'),
    ))
    payment_amount = models.IntegerField('Размер оплаты')
    paid = models.BooleanField('Оплачено')

    comment = models.TextField(blank=True)

    class Meta:
        verbose_name = 'Участник'
        verbose_name_plural = 'Участники'
        unique_together = (
            ('training', 'email'),
        )

    def __str__(self):
        return f'{self.training} - {self.email}'

    # UID is used for sharing anonymised data with third-party,
    # e.g. with academy crowd when we collect data from rationality tests.
    def uid(self):
        SALT = settings.KOCHERGA_MAILCHIMP_UID_SALT.encode()
        return hashlib.sha1(SALT + self.email.lower().encode()).hexdigest()[:10]
