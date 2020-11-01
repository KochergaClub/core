import logging

logger = logging.getLogger(__name__)

from html2text import html2text
from django.db import models
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.core.validators import MaxValueValidator, MinValueValidator

from kocherga.dateutils import inflected_month
from kocherga.email.tools import mjml2html

from kocherga.money.cashier.models import Payment

from kocherga.django.managers import RelayQuerySet

from .promocode import Promocode


class Training(models.Model):
    name = models.CharField('Название', max_length=255)
    slug = models.SlugField(unique=True)

    date = models.DateField('Дата начала', blank=True, null=True)
    telegram_link = models.URLField('Телеграм-чат', blank=True)
    pre_survey_link = models.URLField('Форма предрассылки', blank=True)
    post_survey_link = models.URLField('Форма пострассылки', blank=True)
    gdrive_link = models.URLField('Материалы', blank=True)

    mailchimp_interest_id = models.CharField(
        'ID Mailchimp-группы', max_length=20, blank=True
    )

    post_survey_collected = models.BooleanField(default=False)
    salaries_paid = models.BooleanField(default=False)

    discount_by_email = models.IntegerField(
        "Сумма скидки одноразового промокода по E-mail'у",
        default=0,
        validators=[MinValueValidator(0)],
    )
    discount_percent_by_email = models.IntegerField(
        "Процент скдики одноразового промокода по E-mail'у",
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(100)],
    )

    promocodes = models.ManyToManyField(Promocode, related_name='trainings')

    objects = RelayQuerySet.as_manager()

    class Meta:
        verbose_name = 'Тренинг'
        verbose_name_plural = 'Тренинги'
        ordering = ['-date']
        permissions = (('manage', 'Может управлять тренингами'),)

    def __str__(self):
        return self.name

    def tickets_count(self) -> int:
        return sum(1 for ticket in self.tickets.all() if ticket.status == 'normal')

    tickets_count.short_description = 'Число билетов'

    def total_income(self) -> int:
        return sum(ticket.payment_amount for ticket in self.tickets.all())

    total_income.short_description = 'Суммарный доход'

    def add_day(self, date):
        if not self.date:
            raise Exception("This training doesn't have a start date")

        if date < self.date:
            raise Exception(
                "Can't add day for date which is earlier than training's start date"
            )

        from .training_day import TrainingDay

        day = TrainingDay.objects.create(
            training=self,
            date=date,
        )
        return day

    def copy_schedule_from(self, src_training):
        if not self.date:
            raise Exception("This training doesn't have a start date")

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

    # deprecated
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
            raise Exception(
                f"Training {self} doesn't have any sections, can't calculate salary"
            )

        activity_share = trainer_total / total
        income_share = 0.5

        total_income = self.total_income()
        pure_income = total_income - total_income * 0.035 - total_income * 0.06

        return pure_income * activity_share * income_share

    # unused for now
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

    def send_promocode_email(self, email: str, promocode):
        # TODO - giant switch based on training type
        title = 'Промокод на покупку шаблона «Смоделируй и начни»'
        html_message = mjml2html(
            render_to_string(
                'ratio/email/promocode.mjml',
                {
                    'title': title,
                    'code': promocode.code,
                    'training_genitive': 'шаблона «Смоделируй и начни»',
                    'training_description': """Заботливо собранный Notion-шаблон с 50+ вопросами сделает мысли о проблеме или задаче чёткими и полезными. За четыре сессии по 25 минут вы зафиксируете подробное и конкретное описание проблемы и реализуете первый шаг решения. Шаблон наградит вас добрыми мемами, а тренер по рациональности проверит работу и даст советы, ссылки и поддерживающие комментарии.""",
                    'landing_link': f'{settings.KOCHERGA_WEBSITE}/rationality/online',
                },
            )
        )

        send_mail(
            subject=title,
            from_email='Кочерга <workshop@kocherga-club.ru>',
            html_message=html_message,
            message=html2text(html_message),
            recipient_list=[email],
        )

    def send_unique_promocode(self, email: str):
        # FIXME - copypasted from TicketType
        if not self.discount_by_email and not self.discount_percent_by_email:
            raise Exception("discounts are not configured")

        promocode = Promocode.objects.generate_random(
            discount=self.discount_by_email,
            discount_percent=self.discount_percent_by_email,
            for_email=email,
        )
        self.promocodes.add(promocode)
        self.save()

        self.send_promocode_email(email, promocode)

        return promocode
