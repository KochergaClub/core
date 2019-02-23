from django.db import models
from django.core.mail import send_mail

from kocherga.events.models import Event as KchEvent

from .user import User as MmUser

class Cohort(models.Model):
    event = models.OneToOneField(KchEvent, on_delete=models.CASCADE, related_name='+', blank=True, null=True)
    sent_emails = models.BooleanField(default=False)

    def populate_from_event(self):
        if not self.event:
            raise Exception("Cohort doesn't have an associated event")

        for user in self.event.registered_users():
            MmUser.objects.create(
                user=user,
                cohort=self,
            )
            # TODO - remove everyone else (people can cancel their registrations)

    def send_invite_emails(self, force=False):
        if self.sent_emails and not force:
            raise Exception("Already sent invite emails")

        for user in self.users.all():
            send_mail(
                'Регистрация на мастермайнд-дейтинг',
                f"Мастермайнд-дейтинг в Кочерге уже завтра!\n\nВот ссылка на телеграм-бота, обязательно зарегистрируйтесь через него: {user.telegram_link()}.\n\nЕсли ссылка почему-то не работает, найдите в телеграме бота @KochergaMastermindBot и напишите ему эту строчку:\n/start {str(user.generate_token(), 'utf-8')}\n\nПожалуйста, сделайте это до начала мероприятия.",
                'Кочерга <info@kocherga-club.ru>',
                [user.user.email],
            )
        self.sent_emails = True
        self.save()
