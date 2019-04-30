import logging
logger = logging.getLogger(__name__)

from django.db import models
from django.conf import settings

import kocherga.slack
import kocherga.cm.models
import kocherga.google


class MemberManager(models.Manager):
    def full_list(self):
        return sum(
            [
                list(self.filter(is_current=True, role='FOUNDER')),
                list(self.filter(is_current=True, role='MANAGER')),
                list(self.filter(is_current=True).exclude(role__in=['FOUNDER', 'MANAGER'])),
                list(self.filter(is_current=False)),
            ],
            []
        )


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
        ]
    )

    is_current = models.BooleanField('Текущий сотрудник')
    payment_type = models.CharField(
        max_length=10,
        blank=True,
        choices=[
            ('CASH', 'нал'),
            ('ELECTRONIC', 'безнал'),
        ]
    )

    vk = models.URLField('Профиль VK', max_length=255, blank=True)

    gender = models.CharField(
        'Пол',
        max_length=10,
        null=True,
        choices=[
            ('MALE', 'М'),
            ('FEMALE', 'Ж'),
        ],
    )

    color = models.CharField(max_length=7)

    cm_login = models.CharField('Логин в CM', max_length=255, blank=True)
    cm_customer = models.ForeignKey(
        kocherga.cm.models.Customer,
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name='staff_member',
    )

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='staff_member',
    )

    objects = MemberManager()

    class Meta:
        verbose_name = 'Сотрудник'
        verbose_name_plural = 'Сотрудники'
        permissions = (
            ('manage', 'Может управлять стаффом и доступами'),
        )

    def __str__(self):
        return self.full_name

    @property
    def slack_user(self):
        slack_users = kocherga.slack.users_by_email()

        primary_email = self.user.email.lower()
        alt_emails = [
            a.email.lower() for a in self.alt_emails.all()
        ]

        slack_user = None
        for email in [primary_email] + alt_emails:
            slack_user = slack_users.get(email, None)
            if slack_user:
                break
        return slack_user

    @property
    def slack_id(self):
        slack_user = self.slack_user
        return slack_user['id'] if slack_user else None

    @property
    def slack_image(self):
        slack_user = self.slack_user
        return slack_user['profile']['image_512'] if slack_user else None

    def update_user_permissions(self):
        self.user.is_staff = self.is_current
        self.user.save()

    def grant_google_permissions(self):
        if self.role != 'WATCHMAN':
            raise Exception("Only WATCHMAN google permissions are supported")
        if not self.is_current:
            raise Exception("Only current users can get google permissions")

        calendar = kocherga.google.service("calendar")

        email = None
        for e in [self.user.email] + [a.email for a in self.alt_emails.all()]:
            if e.endswith('@gmail.com'):
                email = e
                break
        else:
            raise Exception("Only @gmail.com users can get google permissions")

        calendar.acl().insert(
            calendarId=settings.KOCHERGA_GOOGLE_CALENDAR_ID,
            body={
                'role': 'writer',
                'scope': {
                    'type': 'user',
                    'value': email,
                }
            },
        ).execute()
        logger.info(f"Granted calendar permissions to {email}")

        gdrive = kocherga.google.service('drive')
        gdrive.permissions().create(
            fileId=settings.GDRIVE_WATCHMEN_FOLDER,
            body={
                'role': 'writer',
                'type': 'user',
                'emailAddress': email,
            }
        ).execute()
        logger.info(f"Granted gdrive permissions to {email}")


class AltEmail(models.Model):
    email = models.EmailField()
    member = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='alt_emails')
