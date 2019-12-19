import logging
logger = logging.getLogger(__name__)

from datetime import date

from django.db import models

from kocherga.dateutils import inflected_month

from kocherga.money.cashier.models import Payment


class TrainingManager(models.Manager):
    def next_training(self):
        return Training.objects.filter(date__gt=date.today()).order_by('date').first()


class Training(models.Model):
    name = models.CharField('Название', max_length=255)
    slug = models.SlugField(unique=True)

    date = models.DateField('Дата начала')
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

    def tickets_count(self) -> int:
        return sum(1 for ticket in self.tickets.all() if ticket.status == 'normal')
    tickets_count.short_description = 'Число билетов'

    def total_income(self) -> int:
        return sum(ticket.payment_amount for ticket in self.tickets.all())
    total_income.short_description = 'Суммарный доход'

    def add_day(self, date):
        if date < self.date:
            raise Exception("Can't add day for date which is earlier than training's start date")

        from .training_day import TrainingDay
        day = TrainingDay.objects.create(
            training=self,
            date=date,
        )
        return day

    def copy_schedule_from(self, src_training):
        # late import - avoiding circular dependency
        from .training_day import TrainingDay

        if self.id == src_training.id:
            raise Exception("Can't copy training's schedule to itself")
        if self.days.count():
            raise Exception("Can't copy schedule when days are already set")

        for src_day in src_training.days.all():
            logger.info(f'Copying day {src_day}')
            day = TrainingDay.objects.create(
                training=self,
                date=src_day.date - src_training.date + self.date,
            )
            for activity in src_day.schedule.all():
                activity.pk = None
                activity.training_day = day
                activity.save()

    @property
    def long_name(self) -> str:
        return (
            'Воркшоп по прикладной рациональности '
            + f'{self.date.day}–{self.date.day + 1} {inflected_month(self.date)} {self.date.year}'
        )

    def all_activities(self):
        for day in self.days.all():
            for activity in day.schedule.all():
                yield activity

    def all_trainers(self):
        trainers = {}
        for activity in self.all_activities():
            if activity.trainer:
                trainers[activity.trainer.id] = activity.trainer

        return list(trainers.values())

    def trainer_salary(self, trainer):
        total = 0
        trainer_total = 0
        for activity in self.all_activities():
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
