import logging
logger = logging.getLogger(__name__)

import markdown

from datetime import datetime

from django.db import models
from django.conf import settings
from django.utils import timezone
from django.core.mail import send_mail
from django.template.loader import render_to_string

import kocherga.dateutils
from kocherga.dateutils import TZ


class TicketManager(models.Manager):
    def register(self, user, event) -> None:
        (ticket, _) = self.update_or_create(
            user=user,
            event=event,
            defaults={'status': 'ok'},
        )

        ticket.send_confirmation_email()

    def unregister(self, user, event) -> None:
        ticket = self.get(
            user=user,
            event=event,
        )
        ticket.status = 'cancelled'
        ticket.save()

    def send_reminders(self):
        tickets = self.filter(
            status='ok',
            event__start__gte=datetime.now(TZ),
            day_before_notification_sent=False,
        )

        logger.info(f'Trying {len(tickets)} tickets for day-before reminders')
        for ticket in tickets:
            ticket.send_day_before_reminder()


class Ticket(models.Model):
    event = models.ForeignKey(
        'Event',
        on_delete=models.PROTECT,
        related_name='tickets',
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)

    created = models.DateTimeField(auto_now_add=True, null=True)
    updated = models.DateTimeField(auto_now=True, null=True)

    status = models.CharField(
        max_length=20,
        choices=(
            ('ok', 'ОК'),
            ('inactive', 'Отказ'),
        ),
        default='ok',
    )

    day_before_notification_sent = models.BooleanField(default=False)

    objects = TicketManager()

    class Meta:
        unique_together = (
            ('event', 'user'),
        )
        permissions = (
            ('view_tickets', 'Может смотреть все билеты'),
        )

    def _common_email_vars(self):
        start_local = timezone.localtime(self.event.start)
        weekday = kocherga.dateutils.weekday(start_local)
        month = kocherga.dateutils.inflected_month(start_local)
        humanized_dt = f"{weekday}, {start_local.day} {month}\n"

        return {
            'event': self.event,
            'humanized_dt': humanized_dt,
            'event_link': f'https://kocherga-club.ru/events/{self.event.uuid}',
            'address_text': 'Москва, ул. Большая Дорогомиловская, д.5к2',  # TODO - move to config
        }

    def send_confirmation_email(self):
        template_vars = self._common_email_vars()

        text_body = render_to_string('events/email/registered.txt', template_vars)
        html_body = markdown.markdown(render_to_string('events/email/registered.md', template_vars))

        send_mail(
            subject='Регистрация на событие',
            from_email='Кочерга <info@kocherga-club.ru>',
            message=text_body,
            html_message=html_body,
            recipient_list=[self.user.email],
        )

    def send_day_before_reminder(self):
        if self.day_before_notification_sent:
            return

        now = datetime.now(TZ)

        if self.event.start < now:
            return  # should never send reminders about future events

        delta = self.event.start.date() - now.date()
        if delta.days != 1:
            return  # too early or too late

        self.day_before_notification_sent = True
        self.save()  # guarantee that we never send an email twice

        template_vars = self._common_email_vars()

        text_body = render_to_string('events/email/day_before_reminder.txt', template_vars)
        html_body = markdown.markdown(render_to_string('events/email/day_before_reminder.md', template_vars))

        logger.info(f'Sending reminder to {self.user.email} about {self.event.id}')
        send_mail(
            subject=f'Напоминание о событии: {self.event.title}',
            from_email='Кочерга <info@kocherga-club.ru>',
            message=text_body,
            html_message=html_body,
            recipient_list=[self.user.email],
        )
