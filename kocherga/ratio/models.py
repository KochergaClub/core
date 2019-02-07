from django.db import models
from django.conf import settings

import hashlib
from datetime import date

class TrainingManager(models.Manager):
    def next_training(self):
        return Training.objects.filter(date__gt=date.today()).order_by('date').first()

class Training(models.Model):
    name = models.CharField(max_length=255, primary_key=True)

    date = models.DateField('Дата начала', null=True)
    telegram_link = models.URLField('Телеграм-чат', blank=True)
    pre_survey_link = models.URLField('Форма предрассылки', blank=True)
    post_survey_link = models.URLField('Форма пострассылки', blank=True)
    gdrive_link = models.URLField('Материалы', blank=True)

    objects = TrainingManager()

    class Meta:
        verbose_name = 'Тренинг'
        verbose_name_plural = 'Тренинги'
        ordering = ['-date']
        permissions = (
            ('manage', 'Может управлять тренингами'),
        )

    def __str__(self):
        return self.name

    def tickets_count(self):
        return sum(1 for ticket in self.tickets.all() if ticket.status == 'normal')
    tickets_count.short_description = 'Число билетов'

    def total_income(self):
        return sum(ticket.payment_amount for ticket in self.tickets.all())
    total_income.short_description = 'Суммарный доход'


class Ticket(models.Model):
    training = models.ForeignKey(Training, verbose_name='Тренинг', on_delete=models.PROTECT, related_name='tickets')

    email = models.EmailField()
    first_name = models.CharField('Имя', max_length=255)
    last_name = models.CharField('Фамилия', max_length=255)

    registration_date = models.DateField('Дата регистрации', null=True)
    status = models.CharField('Статус', max_length=40, choices=(
        ('normal', 'Участник'),
        ('canceled', 'Отказ'), # отказ, перенос, замена, неявка
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

    comment = models.TextField()

    class Meta:
        verbose_name = 'Участник'
        verbose_name_plural = 'Участники'
        unique_together = (
            ('training', 'email'),
        )

    def __str__(self):
        return f'{self.training} - {self.email}'

    # UID is used for sharing anonymised data with third-party, e.g. with academy crowd when we collect data from rationality tests.
    def uid(self):
        SALT = settings.KOCHERGA_MAILCHIMP_UID_SALT.encode()
        return hashlib.sha1(SALT + self.email.lower().encode()).hexdigest()[:10]
