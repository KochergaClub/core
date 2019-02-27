from django.db import models
from django.urls import reverse

from datetime import date
from collections import OrderedDict

from kocherga.dateutils import inflected_month


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

    mailchimp_interest_id = models.CharField('ID Mailchimp-группы', max_length=20, blank=True)

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

    def schedule_by_day(self):
        result = OrderedDict()
        for activity in self.schedule.all():
            day = activity.day
            if day not in result:
                result[day] = []
            result[day].append(activity)

        return [
            {'day': key, 'activities': result[key]}
            for key in result
        ]

    @property
    def long_name(self):
        return (
            'Воркшоп по прикладной рациональности '
            + f'{self.date.day}–{self.date.day + 1} {inflected_month(self.date)} {self.date.year}'
        )

    def get_absolute_url(self):
        return reverse('ratio:training', kwargs={'name': self.name})
