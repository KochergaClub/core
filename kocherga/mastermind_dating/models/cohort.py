from django.db import models
from django.core.mail import send_mail
from django.template.loader import render_to_string

import markdown

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
            bot_link = user.telegram_link()
            bot_token = str(user.generate_token(), 'utf-8')

            message = render_to_string('mastermind_dating/email/bot_link.txt', {
                'bot_link': bot_link,
                'bot_token': bot_token,
            })

            html = markdown.markdown(render_to_string('mastermind_dating/email/bot_link.md', {
                'bot_link': bot_link,
                'bot_token': bot_token,
            }))
            send_mail(
                subject='Регистрация на мастермайнд-дейтинг',
                from_email='Кочерга <info@kocherga-club.ru>',
                message=message,
                html_message=html,
                recipient_list=[user.user.email],
            )
        self.sent_emails = True
        self.save()
