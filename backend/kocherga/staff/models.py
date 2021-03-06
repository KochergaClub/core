import logging

logger = logging.getLogger(__name__)

from django.db import models
from django.conf import settings
from django.forms import widgets

from wagtail.admin import edit_handlers

from kocherga.slack.models import User as SlackUser
import kocherga.cm.models
import kocherga.google


class Member(models.Model):
    short_name = models.CharField('Короткое имя', max_length=20, blank=True)
    full_name = models.CharField('Полное имя', max_length=80)
    # email - from user
    role = models.CharField(
        'Должность',
        max_length=20,
        choices=[
            ('FOUNDER', 'Основатель'),
            ('MANAGER', 'Менеджер'),
            ('VIDEOMANAGER', 'Видеоменеджер'),
            ('WATCHMAN', 'Админ'),
            ('TRAINER', 'Тренер'),
            ('CONSULTANT', 'Внешний консультант'),
            ('VOLUNTEER', 'Волонтёр'),
        ],
    )

    payment_type = models.CharField(
        'Форма зарплаты',
        max_length=10,
        blank=True,
        choices=[('CASH', 'нал'), ('ELECTRONIC', 'безнал')],
    )

    vk = models.URLField('Профиль VK', max_length=255, blank=True)

    gender = models.CharField(
        'Пол',
        max_length=10,
        null=True,
        choices=[('MALE', 'М'), ('FEMALE', 'Ж')],
    )

    color = models.CharField(max_length=7)

    cm_login = models.CharField('Логин в КМ', max_length=255, blank=True)
    cm_customer = models.ForeignKey(
        kocherga.cm.models.Customer,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='staff_member',
        verbose_name='Клиент в КМ',
    )

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='staff_member',
        verbose_name='Учетная запись на сайте',
    )

    panels = [
        edit_handlers.MultiFieldPanel(
            [
                edit_handlers.FieldPanel('user'),
                edit_handlers.FieldPanel('full_name'),
                edit_handlers.FieldPanel('short_name'),
                edit_handlers.FieldPanel(
                    'gender',
                    widget=widgets.RadioSelect(),
                ),
                edit_handlers.FieldPanel('vk'),
                edit_handlers.FieldPanel(
                    'color',
                    widget=widgets.TextInput(
                        attrs={'type': 'color', 'style': 'box-sizing: content-box'}
                    ),
                ),
            ],
            heading='Личные данные',
        ),
        edit_handlers.MultiFieldPanel(
            [
                edit_handlers.FieldPanel('role'),
                edit_handlers.FieldPanel(
                    'payment_type',
                    widget=widgets.RadioSelect(),
                ),
            ],
            heading='Работа',
        ),
        edit_handlers.MultiFieldPanel(
            [
                edit_handlers.FieldPanel('cm_login'),
                edit_handlers.FieldPanel('cm_customer'),
            ],
            heading='Кафе-менеджер',
        ),
    ]

    class Meta:
        verbose_name = 'Сотрудник'
        verbose_name_plural = 'Сотрудники'
        permissions = (('manage', 'Может управлять стаффом и доступами'),)

    def __str__(self):
        return self.full_name

    @property
    def is_current(self) -> bool:
        return self.user.is_staff

    @property
    def slack_user(self):
        primary_email = self.user.email.lower()
        alt_emails = [a.email.lower() for a in self.alt_emails.all()]

        slack_user = None
        for email in [primary_email] + alt_emails:
            try:
                slack_user = SlackUser.objects.get(email=email)
                break
            except SlackUser.DoesNotExist:
                continue

        return slack_user

    @property
    def slack_id(self):
        slack_user = self.slack_user
        return slack_user.slack_id if slack_user else None

    @property
    def slack_image(self):
        slack_user = self.slack_user
        return slack_user.image_url if slack_user else None

    def grant_google_permissions(self):
        if self.role != 'WATCHMAN':
            raise Exception("Only WATCHMAN google permissions are supported")
        if not self.is_current:
            raise Exception("Only current users can get google permissions")

        email = None
        for e in [self.user.email] + [a.email for a in self.alt_emails.all()]:
            if e.endswith('@gmail.com'):
                email = e
                break
        else:
            raise Exception("Only @gmail.com users can get google permissions")

        gdrive = kocherga.google.service('drive')
        gdrive.permissions().create(
            fileId=settings.GDRIVE_WATCHMEN_FOLDER,
            body={'role': 'writer', 'type': 'user', 'emailAddress': email},
        ).execute()
        logger.info(f"Granted gdrive permissions to {email}")

    def fire(self):
        if not self.is_current:
            raise Exception("Already fired")
        self.user.is_staff = False
        self.user.save()

    def unfire(self):
        if self.is_current:
            raise Exception("User is already on staff")
        self.user.is_staff = True
        self.user.save()


class AltEmail(models.Model):
    email = models.EmailField()
    member = models.ForeignKey(
        Member, on_delete=models.CASCADE, related_name='alt_emails'
    )
