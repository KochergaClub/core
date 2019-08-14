from datetime import date
from collections import OrderedDict

from django.db import models

from kocherga.dateutils import inflected_month

from kocherga.money.cashier.models import Payment


class TrainingManager(models.Manager):
    def next_training(self):
        return Training.objects.filter(date__gt=date.today()).order_by('date').first()


class Training(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)

    date = models.DateField('Дата начала', null=True)
    telegram_link = models.URLField('Телеграм-чат', blank=True)
    pre_survey_link = models.URLField('Форма предрассылки', blank=True)
    post_survey_link = models.URLField('Форма пострассылки', blank=True)
    gdrive_link = models.URLField('Материалы', blank=True)

    mailchimp_interest_id = models.CharField('ID Mailchimp-группы', max_length=20, blank=True)

    post_survey_collected = models.BooleanField(default=False)
    salaries_paid = models.BooleanField(default=False)

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

    def copy_schedule_from(self, src_training):
        if self.id == src_training.id:
            raise Exception("Can't copy training's schedule to itself")
        if self.schedule.count():
            raise Exception("Can't copy schedule when schedule is non-empty")

        for activity in src_training.schedule.all():
            activity.pk = None
            activity.training = self
            activity.save()

    @property
    def long_name(self):
        return (
            'Воркшоп по прикладной рациональности '
            + f'{self.date.day}–{self.date.day + 1} {inflected_month(self.date)} {self.date.year}'
        )

    def all_trainers(self):
        trainers = {}
        for activity in self.schedule.all():
            if activity.trainer:
                trainers[activity.trainer.id] = activity.trainer

        return list(trainers.values())

    def trainer_salary(self, trainer):
        total = 0
        trainer_total = 0
        for activity in self.schedule.all():
            if activity.activity_type != 'section':
                continue
            total += 1
            if activity.trainer.id != trainer.id:
                continue
            trainer_total += 1

        if total == 0:
            raise Exception(f"Training {self} doesn't have any sections, can't calculate salary")

        activity_share = trainer_total / total
        income_share = 0.5

        total_income = self.total_income()
        pure_income = total_income - total_income * 0.035 - total_income * 0.06

        return pure_income * activity_share * income_share

    def pay_salaries(self):
        for trainer in self.all_trainers():
            salary = self.trainer_salary(trainer)
            Payment.objects.create(
                whom=trainer.user,
                amount=salary,
                comment=f'Зарплата за тренинг {self.name}',
            )
        self.salaries_paid = True
        self.save()
