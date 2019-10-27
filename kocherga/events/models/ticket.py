import markdown

from django.db import models
from django.conf import settings
from django.utils import timezone
from django.core.mail import send_mail
from django.template.loader import render_to_string

import kocherga.dateutils


class TicketManager(models.Manager):
    def register(self, user, event) -> None:
        self.update_or_create(
            user=user,
            event=event,
            defaults={'status': 'ok'},
        )

        start_local = timezone.localtime(event.start)
        weekday = kocherga.dateutils.weekday(start_local)
        month = kocherga.dateutils.inflected_month(start_local)
        humanized_dt = f"{weekday}, {start_local.day} {month}\n"

        message = render_to_string('events/email/registered.txt', {
            'event': event,
            'humanized_dt': humanized_dt,
        })

        html = markdown.markdown(render_to_string('events/email/registered.md', {
            'event': event,
            'humanized_dt': humanized_dt,
        }))
        send_mail(
            subject='Регистрация на событие',
            from_email='Кочерга <info@kocherga-club.ru>',
            message=message,
            html_message=html,
            recipient_list=[user.email],
        )

    def unregister(self, user, event) -> None:
        ticket = self.get(
            user=user,
            event=event,
        )
        ticket.status = 'cancelled'
        ticket.save()


class Ticket(models.Model):
    event = models.ForeignKey(
        'Event',
        on_delete=models.PROTECT,
        related_name='tickets',
    )

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

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT)

    objects = TicketManager()

    class Meta:
        unique_together = (
            ('event', 'user'),
        )
        permissions = (
            ('view_tickets', 'Может смотреть все билеты'),
        )
