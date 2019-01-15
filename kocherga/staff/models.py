from django.db import models
from django.conf import settings

import enum

import kocherga.slack
import kocherga.cm.models

class Member(models.Model):
    short_name = models.CharField(max_length=20, blank=True)
    full_name = models.CharField(max_length=80)
    # email - from user
    role = models.CharField(
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

    is_current = models.BooleanField() # was: status
    payment_type = models.CharField(
        max_length=10,
        blank=True,
        choices=[
            ('CASH', 'нал'),
            ('ELECTRONIC', 'безнал'),
        ]
    )

    vk = models.CharField(max_length=255, blank=True)

    gender = models.CharField(
        max_length=10,
        null=True,
        choices=[
            ('MALE', 'М'),
            ('FEMALE', 'Ж'),
        ],
    )

    cm_login = models.CharField(max_length=255, blank=True)
    cm_card_id = models.IntegerField(null=True)
    cm_customer = models.ForeignKey(kocherga.cm.models.Customer, null=True, on_delete=models.SET_NULL)

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='staff_member',
    )

    class Meta:
        verbose_name = 'Сотрудник'
        verbose_name_plural = 'Сотрудники'

    def __str__(self):
        return self.full_name

    @property
    def slack_id(self):
        slack_users = kocherga.slack.users_by_email()

        primary_email = self.user.email.lower()
        alt_emails = [
            a.email.lower() for a in self.alt_emails
        ]

        for email in [primary_email] + alt_emails:
            slack_user = slack_users.get(email, None)
            if slack_user:
                break
        slack_id = slack_user["id"] if slack_user else None

        return slack_id

    def update_user_permissions(self):
        self.user.is_staff = self.is_current
        self.user.save()


class AltEmail(models.Model):
    email = models.EmailField()
    member = models.ForeignKey(Member, on_delete=models.CASCADE, related_name='alt_emails')
